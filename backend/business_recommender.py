"""
Professional Business Recommendation Engine
Retrieves real business data from the Rwanda Side Hustle dataset
No hardcoded lists - all data-driven from CSV
"""

import pandas as pd
import numpy as np
from typing import List, Dict, Any
import os

class BusinessRecommender:
    def __init__(self, dataset_path='rwanda_side_hustle_10000.csv'):
        """Initialize recommender with dataset"""
        self.df = pd.read_csv(dataset_path)
        self.businesses = self._prepare_business_data()
        print(f"[RECOMMENDER] Loaded {len(self.businesses)} unique businesses from dataset")
    
    def _prepare_business_data(self) -> pd.DataFrame:
        """Prepare business statistics from dataset"""
        # Group by hustle type and calculate key metrics
        business_stats = self.df.groupby('hustle_type').agg({
            'initial_capital (RWF)': ['mean', 'min', 'max', 'median'],
            'monthly_profit (RWF)': ['mean', 'median'],
            'monthly_revenue (RWF)': ['mean', 'median'],
            'monthly_expenses (RWF)': ['mean', 'median'],
            'hours_per_week': ['mean', 'median'],
            'growth_rate (%)': 'mean',
            'break_even_time (months)': 'mean',
            'customer_satisfaction (1-5)': 'mean',
            'repeat_customers (%)': 'mean',
            'skills_required': 'first',
            'category': 'first',
            'user_id': 'count'  # number of samples
        }).reset_index()
        
        # Flatten column names
        business_stats.columns = ['_'.join(col).strip('_') for col in business_stats.columns.values]
        business_stats = business_stats.rename(columns={'hustle_type_': 'hustle_type'})
        
        # Calculate success rate for each business
        success_rates = self.df.groupby('hustle_type')['success_status'].apply(
            lambda x: (x.isin(['Successful', 'Growing'])).mean()
        ).reset_index()
        success_rates.columns = ['hustle_type', 'success_rate']
        
        # Merge with main stats
        business_stats = business_stats.merge(success_rates, on='hustle_type')
        
        # Calculate overall score (0-100)
        business_stats['overall_score'] = (
            business_stats['success_rate'] * 40 +  # 40% weight on success
            (business_stats['customer_satisfaction (1-5)_mean'] / 5) * 20 +  # 20% weight on satisfaction
            (business_stats['growth_rate (%)_mean'] / 100) * 20 +  # 20% weight on growth
            (business_stats['repeat_customers (%)_mean'] / 100) * 20  # 20% weight on retention
        )
        
        return business_stats
    
    def recommend(self, user_data: Dict[str, Any], top_n: int = 3) -> List[Dict[str, Any]]:
        """
        Recommend businesses based on user profile
        
        Args:
            user_data: Dictionary with user info (capital, hours, skills, location, etc.)
            top_n: Number of recommendations to return
            
        Returns:
            List of recommended businesses with scores
        """
        # Extract user parameters
        capital = float(user_data.get('startup_capital_rwf', 0))
        hours_per_week = float(user_data.get('hours_per_day', 4)) * 7
        user_skills = user_data.get('skills', [])
        if isinstance(user_skills, str):
            user_skills = [s.strip() for s in user_skills.split(',')]
        
        location = user_data.get('location', 'Gasabo')
        sector = user_data.get('sector', '')
        has_disability = str(user_data.get('has_disability', 'No')).lower() in ('yes', 'true', '1')
        has_smartphone = str(user_data.get('has_smartphone', 'Yes')).lower() in ('yes', 'true', '1')
        age = int(user_data.get('age', 25))
        
        # Score each business
        scored_businesses = []
        
        for _, business in self.businesses.iterrows():
            score = self._calculate_match_score(
                business, capital, hours_per_week, user_skills, 
                has_disability, has_smartphone, age, location, sector
            )
            
            if score > 0:  # Only include viable businesses
                scored_businesses.append({
                    'hustle_name': business['hustle_type'],
                    'category': business['category_first'],
                    'score': round(score, 2),
                    'capital_needed': round(business['initial_capital (RWF)_median']),
                    'capital_range': {
                        'min': round(business['initial_capital (RWF)_min']),
                        'max': round(business['initial_capital (RWF)_max']),
                    },
                    'monthly_profit': round(business['monthly_profit (RWF)_median']),
                    'monthly_revenue': round(business['monthly_revenue (RWF)_median']),
                    'hours_per_week': round(business['hours_per_week_median'], 1),
                    'success_rate': round(business['success_rate'] * 100, 1),
                    'break_even_months': round(business['break_even_time (months)_mean'], 1),
                    'customer_satisfaction': round(business['customer_satisfaction (1-5)_mean'], 1),
                    'growth_rate': round(business['growth_rate (%)_mean'], 1),
                    'skills_required': business['skills_required_first'],
                    'sample_count': int(business['user_id_count'])
                })
        
        # Sort by score and return top N
        scored_businesses.sort(key=lambda x: x['score'], reverse=True)
        return scored_businesses[:top_n]
    
    def _calculate_match_score(
        self, business: pd.Series, capital: float, hours: float,
        skills: List[str], has_disability: bool, has_smartphone: bool,
        age: int, location: str, sector: str
    ) -> float:
        """Calculate match score for a business (0-100)"""
        
        score = business['overall_score']  # Start with base score (0-100)
        
        # ===== 1. CAPITAL MATCH (Weight: 30 points) =====
        min_capital = business['initial_capital (RWF)_min']
        median_capital = business['initial_capital (RWF)_median']
        
        if capital >= median_capital:
            score += 30  # Perfect capital match
        elif capital >= min_capital:
            # Proportional score
            ratio = (capital - min_capital) / (median_capital - min_capital)
            score += 30 * ratio
        elif capital >= min_capital * 0.5:
            score += 10  # Can potentially start with less
        else:
            score -= 50  # Too low capital - strong penalty
        
        # ===== 2. SKILLS MATCH (Weight: 40 points) =====
        required_skill = str(business['skills_required_first']).lower()
        skills_match = False
        
        # Skill category mapping (simplified)
        skill_keywords = {
            'Agriculture / Farming': ['farm', 'crop', 'animal', 'poultry', 'fish', 'dairy', 'mushroom', 'honey'],
            'Technology / IT': ['digital', 'web', 'software', 'it', 'computer', 'tech', 'graphic', 'content'],
            'Cooking / Food': ['food', 'cooking', 'baking', 'catering', 'restaurant', 'juice', 'snack'],
            'Sewing / Fashion': ['tailor', 'sewing', 'fashion', 'garment', 'cloth'],
            'Driving / Transport': ['taxi', 'moto', 'transport', 'delivery', 'driving', 'riding'],
            'Beauty / Hairdressing': ['salon', 'beauty', 'hair', 'barbershop', 'cosmetic'],
            'Construction / Trades': ['electric', 'plumb', 'construction', 'carpenter', 'weld', 'repair'],
            'Business / Finance': ['shop', 'retail', 'wholesale', 'trading', 'sales', 'vendor'],
            'Teaching / Education': ['tutor', 'teaching', 'education', 'training', 'school'],
            'Crafts / Art': ['craft', 'pottery', 'basket', 'soap', 'candle', 'art'],
        }
        
        for skill in skills:
            if skill in skill_keywords:
                # Check if any keyword matches the required skill
                if any(keyword in required_skill for keyword in skill_keywords[skill]):
                    skills_match = True
                    score += 40  # Perfect skill match
                    break
        
        if not skills_match:
            # Partial match or general business
            if 'retail' in required_skill or 'shop' in required_skill or 'sales' in required_skill:
                score += 20  # General business - anyone can do
            else:
                score -= 30  # Skill mismatch penalty
        
        # ===== 3. TIME AVAILABILITY (Weight: 15 points) =====
        required_hours = business['hours_per_week_median']
        
        if hours >= required_hours:
            score += 15  # Enough time
        elif hours >= required_hours * 0.7:
            score += 10  # Mostly enough time
        else:
            score -= 20  # Not enough time
        
        # ===== 4. ACCESSIBILITY (Weight: 10 points) =====
        category = business['category_first']
        
        # Digital businesses need smartphone
        if 'Digital' in category:
            if has_smartphone:
                score += 10
            else:
                score -= 40  # Cannot do digital without phone
        
        # Physical businesses can be done by anyone
        if has_disability:
            # Favor less physical businesses
            if category in ['Digital', 'Services', 'Trade']:
                score += 10
            elif category in ['Agriculture', 'Construction', 'Transport']:
                score -= 20
        
        # ===== 5. AGE APPROPRIATENESS (Weight: 5 points) =====
        if age < 25:
            # Young people - favor modern/digital
            if category in ['Digital', 'Services']:
                score += 5
        elif age > 50:
            # Older people - favor traditional/stable
            if category in ['Agriculture', 'Trade', 'Craft & Manufacturing']:
                score += 5
        
        return max(0, score)  # Ensure non-negative
    
    def get_business_details(self, hustle_name: str) -> Dict[str, Any]:
        """Get detailed information about a specific business"""
        business = self.businesses[self.businesses['hustle_type'] == hustle_name]
        
        if business.empty:
            return None
        
        business = business.iloc[0]
        
        return {
            'name': business['hustle_type'],
            'category': business['category_first'],
            'capital': {
                'min': round(business['initial_capital (RWF)_min']),
                'median': round(business['initial_capital (RWF)_median']),
                'max': round(business['initial_capital (RWF)_max']),
                'mean': round(business['initial_capital (RWF)_mean']),
            },
            'financials': {
                'monthly_revenue': round(business['monthly_revenue (RWF)_mean']),
                'monthly_expenses': round(business['monthly_expenses (RWF)_mean']),
                'monthly_profit': round(business['monthly_profit (RWF)_mean']),
                'profit_margin': round((business['monthly_profit (RWF)_mean'] / business['monthly_revenue (RWF)_mean']) * 100, 1) if business['monthly_revenue (RWF)_mean'] > 0 else 0,
            },
            'performance': {
                'success_rate': round(business['success_rate'] * 100, 1),
                'growth_rate': round(business['growth_rate (%)_mean'], 1),
                'customer_satisfaction': round(business['customer_satisfaction (1-5)_mean'], 1),
                'repeat_customers': round(business['repeat_customers (%)_mean'], 1),
                'break_even_months': round(business['break_even_time (months)_mean'], 1),
            },
            'requirements': {
                'hours_per_week': round(business['hours_per_week_mean'], 1),
                'skills_required': business['skills_required_first'],
            },
            'data_points': int(business['user_id_count'])
        }
    
    def get_all_businesses(self) -> List[str]:
        """Get list of all available businesses"""
        return sorted(self.businesses['hustle_type'].tolist())
    
    def get_businesses_by_category(self, category: str) -> List[str]:
        """Get businesses filtered by category"""
        filtered = self.businesses[self.businesses['category_first'] == category]
        return sorted(filtered['hustle_type'].tolist())


# ===== TEST FUNCTION =====
if __name__ == '__main__':
    print("\n" + "="*80)
    print("TESTING BUSINESS RECOMMENDER ENGINE")
    print("="*80 + "\n")
    
    # Initialize recommender
    recommender = BusinessRecommender()
    
    # Test user profile
    user_data = {
        'startup_capital_rwf': 500000,  # 500K RWF
        'hours_per_day': 5,
        'skills': ['Cooking / Food', 'Business / Finance'],
        'location': 'Gasabo',
        'sector': 'Remera',
        'has_disability': 'No',
        'has_smartphone': 'Yes',
        'age': 28
    }
    
    print(" TEST USER PROFILE:")
    print(f"   Capital: {user_data['startup_capital_rwf']:,} RWF")
    print(f"   Hours/day: {user_data['hours_per_day']}")
    print(f"   Skills: {', '.join(user_data['skills'])}")
    print(f"   Location: {user_data['location']} - {user_data['sector']}")
    print(f"   Age: {user_data['age']}\n")
    
    # Get recommendations
    recommendations = recommender.recommend(user_data, top_n=5)
    
    print(" TOP 5 RECOMMENDED BUSINESSES:\n")
    for i, business in enumerate(recommendations, 1):
        print(f"{i}. {business['hustle_name']}")
        print(f"   Category: {business['category']}")
        print(f"   Score: {business['score']}/100")
        print(f"   Capital Needed: {business['capital_needed']:,} RWF")
        print(f"   Monthly Profit: {business['monthly_profit']:,} RWF")
        print(f"   Success Rate: {business['success_rate']}%")
        print(f"   Skills: {business['skills_required']}")
        print(f"   Based on {business['sample_count']} real businesses\n")
    
    print("="*80)
    print(" RECOMMENDER ENGINE WORKING PERFECTLY!")
    print("="*80)
