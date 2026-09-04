import os
import sqlite3
import json
import datetime
import jwt
import random
import string
import secrets
import re
import subprocess
import tempfile
import numpy as np
import pandas as pd
import joblib
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
import smtplib
import africastalking
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from functools import wraps
from database import get_db, init_db
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

load_dotenv() # Load environment variables from .env

#  App setup 
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hustle4", "dist")
app = Flask(__name__, static_folder=DIST_DIR, static_url_path="")
app.config['SECRET_KEY'] = 'rwanda-hustle-secure-key-2024'
CORS(app)

@app.after_request
def after_request(response):
    origin = request.headers.get('Origin', '*')
    response.headers['Access-Control-Allow-Origin'] = origin
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

# CORS is handled by flask-cors and the after_request decorator below


BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

@app.before_request
def log_request_info():
    print(f"[DEBUG] {request.method} {request.path} from {request.remote_addr}")

#  Helpers 
def is_valid_contact(contact):
    # Email regex
    if re.match(r"[^@]+@[^@]+\.[^@]+", contact): return "email"
    # Phone regex (e.g., 07... or +250...)
    if re.match(r"^(\+250|0)7[2389][0-9]{7}$", contact): return "phone"
    return None

def send_verification_code(contact, code):
    contact_type = is_valid_contact(contact)
    print(f"[AUTH] Sending {code} to {contact} ({contact_type})")
    
    # ALWAYS print to console for development visibility
    print(f"\n**************************************************")
    print(f"  VERIFICATION CODE FOR {contact}: {code}")
    print(f"**************************************************\n")

    if contact_type == "email":
        try:
            EMAIL_USER = os.environ.get("EMAIL_USER")
            EMAIL_PASS = os.environ.get("EMAIL_PASS")
            
            if not EMAIL_USER or not EMAIL_PASS:
                print(f"[EMAIL ERROR] EMAIL_USER or EMAIL_PASS not set in .env")
                return

            # Strip spaces from App Password if present
            clean_pass = EMAIL_PASS.replace(" ", "")

            msg = MIMEMultipart()
            msg['From'] = f"RwandaHustle Team <{EMAIL_USER}>"
            msg['To'] = contact
            msg['Subject'] = "RwandaHustle - Your Verification Code"
            
            html_body = f"""
            <html>
            <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 40px; margin: 0;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">RwandaHustle</h1>
                        <p style="color: rgba(255,255,255,0.8); margin-top: 8px; font-size: 16px;">Secure Account Activation</p>
                    </div>
                    <div style="padding: 40px; text-align: center;">
                        <h2 style="color: #1e293b; margin-top: 0; font-size: 22px; font-weight: 700;">Your Verification Code</h2>
                        <p style="color: #64748b; line-height: 1.6; font-size: 15px; margin-bottom: 32px;">Please enter the code below in the app to activate your account and start your journey.</p>
                        
                        <div style="background-color: #f1f5f9; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                            <span style="font-size: 42px; font-weight: 800; color: #2563eb; letter-spacing: 8px;">{code}</span>
                        </div>
                        
                        <p style="color: #94a3b8; font-size: 13px; margin-bottom: 0;">This code will expire in <b>10 minutes</b>.</p>
                    </div>
                    <div style="padding: 0 40px 40px; text-align: center; border-top: 1px solid #f1f5f9;">
                        <p style="color: #64748b; font-size: 14px; margin-top: 32px;">
                            <b>Didn't request this?</b><br>
                            If you didn't create an account with RwandaHustle, you can safely <b>ignore and delete</b> this email. No further action is required.
                        </p>
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 12px;">
                            © 2024 RwandaHustle. Empowering Entrepreneurs across Rwanda.
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """
            msg.attach(MIMEText(html_body, 'html'))
            
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.set_debuglevel(1) # See full SMTP log in console
                server.starttls()
                server.login(EMAIL_USER, clean_pass)
                server.sendmail(EMAIL_USER, contact, msg.as_string())
            
            print(f"[EMAIL SENT] Success to {contact}")
        except Exception as e:
            print(f"[EMAIL ERROR] Failed to send email to {contact}: {e}")
    elif contact_type == "phone":
        # Phone - Africa's Talking Integration
        try:
            AT_USERNAME = os.environ.get("AT_USERNAME")
            AT_API_KEY = os.environ.get("AT_API_KEY")
            
            if not AT_USERNAME or not AT_API_KEY:
                print(f"[SMS ERROR] AT_USERNAME or AT_API_KEY not set in .env")
                return

            africastalking.initialize(AT_USERNAME, AT_API_KEY)
            sms = africastalking.SMS
            
            message = f"Your RwandaHustle verification code is: {code}. It expires in 10 minutes."
            
            # Ensure phone is in E.164 format (e.g., +25078...)
            phone = contact
            if not phone.startswith('+'):
                if phone.startswith('0'): phone = "+250" + phone[1:]
                else: phone = "+250" + phone
            
            response = sms.send(message, [phone])
            print(f"[SMS SENT] Response: {response}")
        except Exception as e:
            print(f"[SMS ERROR] Failed to send SMS to {contact}: {e}")

#  Load model artifacts and Business Recommender 
print("Loading ML models and professional business recommender...")
try:
    # Load ML model for predictions
    model        = joblib.load(os.path.join(MODEL_DIR, "gradient_boosting_model.pkl" if os.path.exists(os.path.join(MODEL_DIR, "gradient_boosting_model.pkl")) else "final_hustle_model.pkl"))
    scaler       = joblib.load(os.path.join(MODEL_DIR, "gb_scaler.pkl" if os.path.exists(os.path.join(MODEL_DIR, "gb_scaler.pkl")) else "final_scaler.pkl"))
    le_target    = joblib.load(os.path.join(MODEL_DIR, "gb_label_encoder.pkl" if os.path.exists(os.path.join(MODEL_DIR, "gb_label_encoder.pkl")) else "final_label_encoder.pkl"))
    
    # Initialize Professional Business Recommender (data-driven from CSV)
    from business_recommender import BusinessRecommender
    business_recommender = BusinessRecommender(os.path.join(BASE_DIR, "rwanda_side_hustle_10000.csv"))
    print(f" Professional Business Recommender loaded with {len(business_recommender.businesses)} businesses from dataset")
    
    # Legacy support (if needed for old endpoints)
    with open(os.path.join(MODEL_DIR, "hustle_stats.json")) as f:
        hustle_stats = json.load(f)
    with open(os.path.join(MODEL_DIR, "metadata.json")) as f:
        metadata = json.load(f)
    # Load business knowledge base
    kb_path = os.path.join(MODEL_DIR, "business_knowledge_base.json")
    if os.path.exists(kb_path):
        with open(kb_path) as f:
            business_kb = json.load(f)
        print(f"Business knowledge base loaded: {len(business_kb)} hustles.")
    else:
        business_kb = {}
        print("Warning: business_knowledge_base.json not found.")
    print(f"Final model loaded successfully.")
except Exception as e:
    print(f"Error loading final model: {e}")

#  Static options 
LOCATIONS = [
    "Bugesera","Burera","Gakenke","Gasabo","Gatsibo","Gicumbi","Gisagara","Huye","Kamonyi","Karongi",
    "Kayonza","Kicukiro","Kirehe","Muhanga","Musanze","Ngoma","Ngororero",
    "Nyabihu","Nyagatare","Nyamasheke","Nyanza","Nyarugenge","Nyaruguru","Rubavu","Ruhango","Rulindo",
    "Rusizi","Rutsiro","Rwamagana"
]
JOBS = [
    "Accountant","Artisan","Bank Employee","Cashier","Cleaner",
    "Construction Worker","Driver","Electrician","Farmer","IT Specialist",
    "Mechanic","NGO Worker","Nurse","Office Worker","Plumber",
    "Receptionist","Security Guard","Shop Assistant","Social Worker",
    "Student","Tailor","Teacher","Waiter","Unemployed"
]
EDUCATION_LEVELS = ["Primary","Secondary","Vocational","University","Degree/PHD"]
MARKETING_CHANNELS = [
    "Market Stall","WhatsApp Business","Radio Adverts",
    "Social Media (WhatsApp/Facebook)","Location Visibility","Word of Mouth"
]
LANGUAGES = ["Kinyarwanda", "English", "French", "Swahili"]
GENDER_OPTIONS = ["Male","Female"]
CLASS_LABELS = {0: "Low", 1: "Medium", 2: "High"}

#  Auth Decorator 
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token.replace('Bearer ', ''), app.config['SECRET_KEY'], algorithms=["HS256"])
            db = get_db()
            current_user = db.execute("SELECT * FROM users WHERE id = ?", (data['user_id'],)).fetchone()
            db.close()
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
        except jwt.ExpiredSignatureError:
            print("[AUTH ERROR] Token has expired")
            return jsonify({'message': 'Token is invalid!'}), 401
        except jwt.InvalidTokenError as e:
            print(f"[AUTH ERROR] Invalid token: {e}")
            return jsonify({'message': 'Token is invalid!'}), 401
        except Exception as e:
            print(f"[AUTH ERROR] Token validation failed: {e}")
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(dict(current_user), *args, **kwargs)
    return decorated

#  Helpers 
def safe_encode(encoder, value, default=0):
    try:
        return int(encoder.transform([str(value)])[0])
    except:
        return default

def build_features(data: dict) -> pd.DataFrame:
    """
    Build a feature vector that matches EXACTLY the columns used during training.
    Feature names come from models/final_feature_names.csv:
      age, gender_enc, edu_enc, scale_enc,
      initial_capital (RWF), hours_per_week, number_of_workers,
      training_enc, internet_enc, location_type_enc,
      monthly_revenue (RWF), monthly_expenses (RWF), monthly_profit (RWF),
      growth_rate (%), break_even_time (months),
      competition_enc, demand_enc, seasonality_enc, gov_support_enc,
      mkt_access_enc, social_media_enc, online_sales_percentage (%),
      advertising_budget (RWF), customer_satisfaction (1-5), repeat_customers (%),
      risk_enc, business_plan_enc,
      category_Agriculture, category_Craft & Manufacturing, category_Digital,
      category_Food & Beverage, category_Services, category_Trade, category_Transport,
      employment_status_Employed, employment_status_Self-employed,
      employment_status_Student, employment_status_Unemployed
    """
    def yn(key, default="No"):
        val = data.get(key, default)
        if isinstance(val, bool): return int(val)
        return 1 if str(val).lower() in ("yes", "true", "1") else 0

    # Ordinal maps — same as train_model.py
    edu_map   = {"None": 0, "Primary": 1, "O-Level": 2, "A-Level": 3, "Vocational": 4, "University": 5}
    lmh_map   = {"Low": 0, "Medium": 1, "High": 2}
    scale_map = {"Micro": 0, "Small": 1, "Medium": 2}
    mkt_map   = {"Local neighbourhood": 0, "Sector market": 1, "District market": 2,
                 "National market": 3, "Export/Online": 4}

    #  Numeric derivations 
    cap      = float(data.get("startup_capital_rwf", 0))
    hrs_day  = float(data.get("hours_per_day", 4))
    hrs_week = float(data.get("hours_per_week", hrs_day * 7))
    revenue  = float(data.get("monthly_revenue_rwf",  cap * 0.8))
    expenses = float(data.get("monthly_expenses_rwf", revenue * 0.6))
    profit   = float(data.get("monthly_profit_rwf",   revenue - expenses))

    #  Base row — names MUST match final_feature_names.csv exactly 
    row = {
        "age"                        : int(data.get("age", 25)),
        "gender_enc"                 : 1 if str(data.get("gender", "Male")).lower() == "male" else 0,
        "edu_enc"                    : edu_map.get(data.get("education_level", "O-Level"), 2),
        "scale_enc"                  : scale_map.get(data.get("business_scale", "Small"), 1),
        "initial_capital (RWF)"      : cap,
        "hours_per_week"             : hrs_week,
        "number_of_workers"          : int(data.get("number_of_workers", 1)),
        "training_enc"               : yn("business_training"),
        "internet_enc"               : yn("internet_access"),
        "location_type_enc"          : 1 if str(data.get("location_type", "Urban")).lower() == "urban" else 0,
        "monthly_revenue (RWF)"      : revenue,
        "monthly_expenses (RWF)"     : expenses,
        "monthly_profit (RWF)"       : profit,
        "growth_rate (%)"            : float(data.get("growth_rate", 10)),
        "break_even_time (months)"   : int(data.get("break_even_time", 6)),
        "competition_enc"            : lmh_map.get(data.get("competition_level", "Medium"), 1),
        "demand_enc"                 : lmh_map.get(data.get("demand_level", "Medium"), 1),
        "seasonality_enc"            : yn("seasonality"),
        "gov_support_enc"            : yn("government_support"),
        "mkt_access_enc"             : mkt_map.get(data.get("access_to_market", "Local neighbourhood"), 0),
        "social_media_enc"           : yn("uses_social_media"),
        "online_sales_percentage (%)" : float(data.get("online_sales_percentage", 0)),
        "advertising_budget (RWF)"   : float(data.get("advertising_budget", 0)),
        "customer_satisfaction (1-5)": float(data.get("customer_satisfaction", 4)),
        "repeat_customers (%)"       : float(data.get("repeat_customers", 30)),
        "risk_enc"                   : lmh_map.get(data.get("risk_level", "Medium"), 1),
        "business_plan_enc"          : yn("has_business_plan"),
    }

    #  Engineered features (v3) 
    training_v  = row["training_enc"]
    plan_v      = row["business_plan_enc"]
    internet_v  = row["internet_enc"]
    row["readiness_score"]   = training_v + plan_v + internet_v
    row["marketing_score"]   = row["social_media_enc"] + (1 if row["advertising_budget (RWF)"] > 0 else 0)
    row["profit_margin"]     = float(profit / revenue) if revenue > 0 else 0.4
    row["capital_roi"]       = float(profit / cap) if cap > 0 else 0.4
    row["revenue_per_hour"]  = float(revenue / hrs_week) if hrs_week > 0 else 0
    cap_q25, cap_q50, cap_q75 = 100000, 300000, 700000  # approx dataset quartiles
    if   cap <= cap_q25: row["capital_band"] = 0
    elif cap <= cap_q50: row["capital_band"] = 1
    elif cap <= cap_q75: row["capital_band"] = 2
    else:                row["capital_band"] = 3

    #  One-hot: category 
    category = data.get("category", "Trade")
    for cat in ["Agriculture", "Craft & Manufacturing", "Digital",
                "Food & Beverage", "Services", "Trade", "Transport"]:
        row[f"category_{cat}"] = 1 if category == cat else 0

    #  One-hot: employment_status 
    emp_status = data.get("employment_status", "Unemployed")
    for status in ["Employed", "Self-employed", "Student", "Unemployed"]:
        row[f"employment_status_{status}"] = 1 if emp_status == status else 0

    #  Align to trained column order 
    df_row = pd.DataFrame([row])
    df_row = df_row.reindex(columns=feature_cols, fill_value=0)

    return scaler.transform(df_row)

def recommend_hustles(user_data: dict, top_n: int = 3) -> list:
    cap      = float(user_data.get("startup_capital_rwf", 0))
    hrs_day  = float(user_data.get("hours_per_day", 4))
    hrs_week = hrs_day * 7  # 7 days/week

    user_skills = user_data.get("skills", [])
    if isinstance(user_skills, str):
        user_skills = [s.strip() for s in user_skills.split(",")]

    has_disability = str(user_data.get("has_disability", "No")).lower() in ("yes", "true", "1")
    has_smartphone = str(user_data.get("has_smartphone", "Yes")).lower() in ("yes", "true", "1")
    location       = user_data.get("location", "Gasabo")

    # Skill dataset skills mapping (mirrors frontend)
    SKILL_MAP = {
        "Technology / IT"      : ["Digital marketing", "Graphic design", "IT & development",
                                   "Web development", "Content creation", "Content production",
                                   "Software development", "Data & admin", "Writing & communication"],
        "Teaching / Education" : ["Teaching", "Educational services", "Driving instruction"],
        "Cooking / Food"       : ["Cooking & food prep", "Food processing", "Baking",
                                   "Catering", "Food handling"],
        "Sewing / Fashion"     : ["Tailoring & sewing", "Fashion retail",
                                   "Garment production", "Artisan craft"],
        "Driving / Transport"  : ["Driving", "Delivery", "Logistics", "Riding",
                                   "Riding & navigation", "Fleet management", "Transport management"],
        "Agriculture / Farming": ["Animal husbandry", "Crop farming", "Poultry farming",
                                   "Dairy farming", "Aquaculture", "Mushroom farming",
                                   "Fruit farming", "Honey production", "Energy production"],
        "Beauty / Hairdressing": ["Beauty & cosmetology", "Hairdressing"],
        "Business / Finance"   : ["Financial services", "Retail", "Sales & negotiation",
                                   "Retail management", "Sales & trading", "Electronics retail"],
        "Photography / Media"  : ["Photography", "Content creation", "Content production"],
        "Construction / Trades": ["Electrical work", "Plumbing", "Construction materials",
                                   "Carpentry", "Welding", "Cobblery", "Printing",
                                   "Electronics repair"],
        "Events / Tourism"     : ["Catering", "Tourism"],
        "Crafts / Art"         : ["Traditional craft", "Pottery", "Basket weaving",
                                   "Artisan craft", "Soap production", "Candle production"],
    }

    # Flatten all skills the user has (mapped to dataset skill names)
    user_ds_skills = set()
    for s in user_skills:
        for ds in SKILL_MAP.get(s, []):
            user_ds_skills.add(ds.lower())

    results = []
    for hustle_name, stats in hustle_stats.items():
        hustle_skill     = stats.get("skills_required", "").lower()
        hustle_skill_cat = stats.get("skill_category", "")  # new field
        hustle_cat       = stats["category"]

        #  1. SKILLS MATCH (highest weight) 
        skill_boost = 0

        # Direct category match using new skill_category field
        if hustle_skill_cat and hustle_skill_cat in user_skills:
            skill_boost = 400  # perfect match
        elif hustle_skill and user_ds_skills:
            # Check for direct matches
            if any(ds in hustle_skill or hustle_skill in ds for ds in user_ds_skills):
                skill_boost = 350
            # Check for keyword matches
            elif any(any(kw in hustle_skill for kw in ds.split()) for ds in user_ds_skills):
                skill_boost = 150

        # Enhanced category-level matching with higher scores
        if skill_boost < 200 and user_skills:  # Apply if no strong match yet
            cat_skill_map = {
                "Agriculture"          : ["Agriculture / Farming"],
                "Digital"              : ["Technology / IT", "Photography / Media"],
                "Food & Beverage"      : ["Cooking / Food"],
                "Services"             : ["Beauty / Hairdressing", "Construction / Trades",
                                          "Teaching / Education", "Photography / Media"],
                "Trade"                : ["Business / Finance"],
                "Transport"            : ["Driving / Transport"],
                "Craft & Manufacturing": ["Crafts / Art", "Sewing / Fashion", "Construction / Trades"],
            }
            if any(s in cat_skill_map.get(hustle_cat, []) for s in user_skills):
                skill_boost = max(skill_boost, 250)  # Increased from 120 to 250
        
        # Additional keyword-based matching for common terms
        if skill_boost < 200 and user_skills and hustle_skill:
            skill_keywords = {
                "Agriculture / Farming": ["farm", "crop", "animal", "poultry", "fish", "agriculture"],
                "Cooking / Food": ["food", "cooking", "baking", "catering", "restaurant"],
                "Teaching / Education": ["teaching", "tutoring", "education", "training", "instruction"],
                "Technology / IT": ["digital", "tech", "computer", "software", "web"],
            }
            for user_skill in user_skills:
                if user_skill in skill_keywords:
                    if any(kw in hustle_skill.lower() for kw in skill_keywords[user_skill]):
                        skill_boost = max(skill_boost, 280)
                        break

        # Base score from historical success data
        score = (stats["avg_score"] * 5) + skill_boost

        #  2. CAPITAL FIT (use min_capital if available) 
        min_cap = stats.get("min_capital", stats["avg_capital"] * 0.5)
        avg_cap = stats["avg_capital"]
        if avg_cap > 0:
            if cap < min_cap * 0.4:
                # Cannot start — too low capital
                score -= 300
                if skill_boost < 200:
                    score -= 100  # extra penalty if no strong skill match
            elif cap < min_cap * 0.7:
                score -= 150 if skill_boost < 200 else 40
            elif cap < min_cap:
                score -= 80 if skill_boost < 200 else 20
            elif cap < avg_cap * 0.8:
                score -= 30 if skill_boost < 200 else 10
            elif cap >= avg_cap * 0.8:
                score += 50  # well-funded bonus
            
            # Extra bonus if user has MORE than enough capital
            if cap >= avg_cap * 1.5:
                score += 30

        #  3. TIME AVAILABILITY 
        min_hrs = stats.get("min_hours_per_week", stats["avg_hours_per_week"] * 0.5)
        avg_hrs = stats["avg_hours_per_week"]
        if avg_hrs > 0:
            if hrs_week < min_hrs * 0.4:
                score -= 250  # not enough time
            elif hrs_week < min_hrs * 0.7:
                score -= 120 if skill_boost < 200 else 30
            elif hrs_week < min_hrs:
                score -= 60 if skill_boost < 200 else 15
            elif hrs_week >= avg_hrs * 0.7:
                score += 50  # good time availability
            
            # Bonus if user has plenty of time
            if hrs_week >= avg_hrs * 1.3:
                score += 30

        #  4. HARD RULES & SKILL-BASED BLOCKING 
        is_digital = hustle_cat == "Digital"
        has_it     = any(s in ["Technology / IT", "Photography / Media"] for s in user_skills)
        
        # Block digital businesses for non-IT users
        if is_digital and not has_it:
            score -= 500
        if is_digital and not has_smartphone:
            score -= 500
        
        # ENHANCED: Check specific business skill requirements to block unmatched trades
        # Map dataset skills to user skill categories
        business_skill_to_category = {
            # Construction/Trades skills
            "plumbing": "Construction / Trades",
            "electrical work": "Construction / Trades",
            "carpentry": "Construction / Trades",
            "welding": "Construction / Trades",
            "construction": "Construction / Trades",
            # Crafts skills
            "basket weaving": "Crafts / Art",
            "pottery": "Crafts / Art",
            "traditional craft": "Crafts / Art",
            "soap production": "Crafts / Art",
            "candle production": "Crafts / Art",
            # Beauty skills
            "beauty": "Beauty / Hairdressing",
            "hairdressing": "Beauty / Hairdressing",
            "cosmetology": "Beauty / Hairdressing",
            # Teaching skills
            "teaching": "Teaching / Education",
            "tutoring": "Teaching / Education",
            "instruction": "Teaching / Education",
            # Food skills
            "cooking": "Cooking / Food",
            "baking": "Cooking / Food",
            "catering": "Cooking / Food",
            "food": "Cooking / Food",
            # Agriculture
            "farming": "Agriculture / Farming",
            "farm": "Agriculture / Farming",
            "crop": "Agriculture / Farming",
            "animal": "Agriculture / Farming",
            "poultry": "Agriculture / Farming",
        }
        
        # Check if business requires a SPECIFIC skill the user doesn't have
        if hustle_skill and user_skills:
            required_category = None
            for skill_keyword, category in business_skill_to_category.items():
                if skill_keyword in hustle_skill.lower():
                    required_category = category
                    break
            
            # If we identified a specific required category and user DOESN'T have it
            if required_category and required_category not in user_skills:
                # This is a complete mismatch - block it
                score -= 600  # Increased from -400 to -600
        
        # Strong penalty for complete skill mismatch (no category match at all)
        if skill_boost < 150 and user_skills:  # User has skills but business doesn't match
            category_mismatch_penalty = 0
            
            # Define which categories require specific skills
            category_skill_requirements = {
                "Craft & Manufacturing": ["Crafts / Art", "Construction / Trades", "Sewing / Fashion"],
                "Digital": ["Technology / IT", "Photography / Media"],
                "Food & Beverage": ["Cooking / Food"],
                "Services": ["Beauty / Hairdressing", "Construction / Trades", "Teaching / Education", 
                            "Photography / Media", "Business / Finance"],
                "Transport": ["Driving / Transport"],
            }
            
            required_skills = category_skill_requirements.get(hustle_cat, [])
            if required_skills and not any(s in user_skills for s in required_skills):
                # User lacks ALL relevant skills for this category
                category_mismatch_penalty = -400
                score += category_mismatch_penalty

        #  5. LOCATION BOOST 
        if location in ["Gasabo", "Kicukiro", "Nyarugenge", "Rubavu", "Musanze"]:
            if hustle_cat in ["Digital", "Services", "Trade"]: score += 60
        if location in ["Nyagatare", "Kayonza", "Gatsibo", "Bugesera"]:
            if hustle_cat == "Agriculture": score += 80
        if location in ["Rusizi", "Rubavu", "Nyagatare"]:
            if hustle_cat == "Trade": score += 50

        #  6. ML SUCCESS PROBABILITY 
        try:
            payload  = {**user_data, "category": hustle_cat}
            X_scaled = build_features(payload)
            proba    = model.predict_proba(X_scaled)[0]
            suc_idx  = list(le_target.classes_).index("Successful")
            score   += float(proba[suc_idx]) * 70
        except:
            pass

        results.append({
            "name"               : hustle_name,
            "category"           : hustle_cat,
            "composite_score"    : round(score, 2),
            "avg_profit"         : round(stats["avg_profit"], 0),
            "avg_revenue"        : round(stats["avg_revenue"], 0),
            "avg_capital"        : round(stats["avg_capital"], 0),
            "avg_hours_per_week" : round(stats["avg_hours_per_week"], 1), # Rounded!
            "success_rate"       : round(stats["overall_success_rate"] * 100, 1),
            "skills_required"    : stats.get("skills_required", ""),
            "demand_level"       : stats.get("demand_level", "Medium"),
            "risk_level"         : stats.get("risk_level", "Medium"),
        })

    results.sort(key=lambda x: -x["composite_score"])

    # Diverse top-3: prefer different categories, but ensure minimum quality
    MIN_ACCEPTABLE_SCORE = 100  # Increased from 50 to ensure better skill matches
    final_top = []
    seen_cats = set()
    
    # First pass: try to get diverse categories with good scores
    for r in results:
        if r["composite_score"] < MIN_ACCEPTABLE_SCORE:
            continue  # Skip if score is too low
        if r["category"] not in seen_cats:
            final_top.append(r)
            seen_cats.add(r["category"])
        if len(final_top) == top_n:
            break

    # Second pass: if we don't have enough, add best remaining (even if same category)
    if len(final_top) < top_n:
        for r in results:
            if r not in final_top and r["composite_score"] >= MIN_ACCEPTABLE_SCORE:
                final_top.append(r)
            if len(final_top) == top_n:
                break
    
    # Third pass: if still not enough, lower the threshold to 50
    if len(final_top) < top_n:
        LOWER_THRESHOLD = 50  # Allow moderate scores as last resort
        for r in results:
            if r not in final_top and r["composite_score"] >= LOWER_THRESHOLD:
                final_top.append(r)
            if len(final_top) == top_n:
                break

    # Assign rank + realistic match %
    THEORETICAL_MAX = 550 # Increased due to higher skill boost
    for i, r in enumerate(final_top):
        r["rank"] = i + 1
        r["match_pct"] = min(99, max(45, round((r["composite_score"] / THEORETICAL_MAX) * 100)))

    return final_top


#  ROUTES 

@app.route("/health")
def health():
    return jsonify({"status": "ok", "n_hustles": len(hustle_stats)})

@app.route("/metadata")
def get_metadata():
    return jsonify({
        "locations": LOCATIONS, "jobs": JOBS, "education_levels": EDUCATION_LEVELS,
        "marketing_channels": MARKETING_CHANNELS, "languages": LANGUAGES, "genders": GENDER_OPTIONS
    })

def generate_password():
    """Generate a strong random password."""
    chars = string.ascii_letters + string.digits + "!@#$%"
    return ''.join(random.choices(chars, k=10))

def send_password_email(contact, password, name):
    """Send auto-generated password to user's email or phone."""
    contact_type = is_valid_contact(contact)
    print(f"\n{'='*50}")
    print(f"  AUTO PASSWORD FOR {contact}: {password}")
    print(f"{'='*50}\n")
    
    if contact_type == "email":
        try:
            EMAIL_USER = os.environ.get("EMAIL_USER")
            EMAIL_PASS = os.environ.get("EMAIL_PASS","").replace(" ","")
            if not EMAIL_USER or not EMAIL_PASS:
                print("[EMAIL] EMAIL_USER or EMAIL_PASS not set"); return
            msg = MIMEMultipart()
            msg['From'] = f"RwandaHustle <{EMAIL_USER}>"
            msg['To'] = contact
            msg['Subject'] = "RwandaHustle — Your Account Password"
            html = f"""<html><body style="font-family:Arial,sans-serif;background:#f4f7fa;padding:40px">
            <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)">
              <div style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:32px;text-align:center">
                <h1 style="color:#fff;margin:0;font-size:24px">RwandaHustle</h1>
                <p style="color:rgba(255,255,255,0.8);margin-top:8px">Welcome, {name}!</p>
              </div>
              <div style="padding:32px;text-align:center">
                <h2 style="color:#0f172a">Your Account is Ready</h2>
                <p style="color:#64748b">Here is your auto-generated password. Use it to log in.</p>
                <div style="background:#f1f5f9;border-radius:12px;padding:20px;margin:24px 0">
                  <span style="font-size:28px;font-weight:800;color:#2563eb;letter-spacing:4px">{password}</span>
                </div>
                <p style="color:#94a3b8;font-size:13px">You can change your password after logging in.</p>
              </div>
            </div></body></html>"""
            msg.attach(MIMEText(html, 'html'))
            with smtplib.SMTP('smtp.gmail.com', 587) as s:
                s.starttls()
                s.login(EMAIL_USER, EMAIL_PASS)
                s.sendmail(EMAIL_USER, contact, msg.as_string())
            print(f"[EMAIL] Password sent to {contact}")
        except Exception as e:
            print(f"[EMAIL ERROR] Could not send password email: {e}")
            print(f"[FALLBACK] Password for {contact}: {password}")
    
    elif contact_type == "phone":
        try:
            AT_USERNAME = os.environ.get("AT_USERNAME")
            AT_API_KEY = os.environ.get("AT_API_KEY")
            
            if not AT_USERNAME or not AT_API_KEY:
                print(f"[SMS ERROR] AT_USERNAME or AT_API_KEY not set in .env")
                print(f"[FALLBACK] Password for {contact}: {password}")
                return
            
            africastalking.initialize(AT_USERNAME, AT_API_KEY)
            sms = africastalking.SMS
            
            message = f"Welcome to RwandaHustle, {name}! Your password is: {password}. Use it to login. Keep it safe!"
            
            phone = contact.strip()
            if not phone.startswith("+"):
                if phone.startswith("0"): phone = "+250" + phone[1:]
                else: phone = "+250" + phone
            
            response = sms.send(message, [phone])
            print(f"[SMS SENT] Password sent to {contact}")
        except Exception as e:
            print(f"[SMS ERROR] Failed to send SMS to {contact}: {e}")
            print(f"[FALLBACK] Password for {contact}: {password}")

def send_login_otp(contact, otp, name):
    """Send OTP for login verification via email or SMS."""
    contact_type = is_valid_contact(contact)
    print(f"\n{'='*50}")
    print(f"  LOGIN OTP FOR {contact}: {otp}")
    print(f"{'='*50}\n")
    
    if contact_type == "email":
        try:
            EMAIL_USER = os.environ.get("EMAIL_USER")
            EMAIL_PASS = os.environ.get("EMAIL_PASS","").replace(" ","")
            if not EMAIL_USER or not EMAIL_PASS:
                print("[EMAIL] EMAIL_USER or EMAIL_PASS not set"); return
            msg = MIMEMultipart()
            msg['From'] = f"RwandaHustle <{EMAIL_USER}>"
            msg['To'] = contact
            msg['Subject'] = "RwandaHustle — Login Verification Code"
            html = f"""<html><body style="font-family:Arial,sans-serif;background:#f4f7fa;padding:40px">
            <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1)">
              <div style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:32px;text-align:center">
                <h1 style="color:#fff;margin:0;font-size:24px">RwandaHustle</h1>
                <p style="color:rgba(255,255,255,0.8);margin-top:8px">Login Verification</p>
              </div>
              <div style="padding:32px;text-align:center">
                <h2 style="color:#0f172a">Your Login Code</h2>
                <p style="color:#64748b">Hi {name}, enter this code to complete your login.</p>
                <div style="background:#f1f5f9;border-radius:12px;padding:20px;margin:24px 0">
                  <span style="font-size:42px;font-weight:800;color:#2563eb;letter-spacing:8px">{otp}</span>
                </div>
                <p style="color:#94a3b8;font-size:13px">This code expires in <b>10 minutes</b>.</p>
              </div>
            </div></body></html>"""
            msg.attach(MIMEText(html, 'html'))
            with smtplib.SMTP('smtp.gmail.com', 587) as s:
                s.starttls()
                s.login(EMAIL_USER, EMAIL_PASS)
                s.sendmail(EMAIL_USER, contact, msg.as_string())
            print(f"[EMAIL] OTP sent to {contact}")
        except Exception as e:
            print(f"[EMAIL ERROR] Could not send OTP email: {e}")
            print(f"[FALLBACK] OTP for {contact}: {otp}")
    
    elif contact_type == "phone":
        try:
            AT_USERNAME = os.environ.get("AT_USERNAME")
            AT_API_KEY = os.environ.get("AT_API_KEY")
            
            if not AT_USERNAME or not AT_API_KEY:
                print(f"[SMS ERROR] AT_USERNAME or AT_API_KEY not set in .env")
                print(f"[FALLBACK] OTP for {contact}: {otp}")
                return
            
            africastalking.initialize(AT_USERNAME, AT_API_KEY)
            sms = africastalking.SMS
            
            message = f"RwandaHustle Login Code: {otp}. Enter this code to complete your login. Expires in 10 minutes."
            
            phone = contact.strip()
            if not phone.startswith("+"):
                if phone.startswith("0"): phone = "+250" + phone[1:]
                else: phone = "+250" + phone
            
            response = sms.send(message, [phone])
            print(f"[SMS SENT] OTP sent to {contact}")
        except Exception as e:
            print(f"[SMS ERROR] Failed to send SMS to {contact}: {e}")
            print(f"[FALLBACK] OTP for {contact}: {otp}")

#  AUTH ROUTES 

@app.route("/auth/signup", methods=["POST"])
def signup():
    data = request.json
    contact = data.get('email_phone', '')
    if not contact:
        return jsonify({"error": "Email or phone is required"}), 400
    contact_type = is_valid_contact(contact)
    if not contact_type:
        return jsonify({"error": "Invalid email or Rwanda phone number"}), 400
    db = get_db()
    try:
        auto_password = generate_password()
        name = data.get('name', 'User')
        # Account is auto-verified — no verification step needed
        db.execute(
            "INSERT INTO users (name, email_phone, password, role, employment_status, language, verified, verification_code) VALUES (?,?,?,?,?,?,?,?)",
            (name, contact, auto_password, 'entrepreneur',
             data.get('employment_status'), data.get('language', 'en'), 1, None)
        )
        db.commit()
        
        # Send password email in background thread (non-blocking)
        import threading
        threading.Thread(target=send_password_email, args=(contact, auto_password, name), daemon=True).start()
        
        return jsonify({
            "message": "Account created successfully! Your password has been sent to your email. Please check your email and login.",
            "redirect_to_login": True,
            "auto_login": False,  # Don't auto-login, user must login manually
            "test_password": auto_password  # For testing only
        })
    except sqlite3.IntegrityError:
        return jsonify({"error": "This email/phone is already registered."}), 400
    finally:
        db.close()

@app.route("/auth/resend-password", methods=["POST"])
def resend_password():
    """Resend password to user's email or phone."""
    data = request.json
    contact = data.get('email_phone', '')
    if not contact:
        return jsonify({"error": "Email or phone is required"}), 400
    
    db = get_db()
    try:
        user = db.execute("SELECT name, password FROM users WHERE email_phone = ?", (contact,)).fetchone()
        if not user:
            return jsonify({"error": "No account found with this contact."}), 404
        
        # Resend the existing password
        import threading
        threading.Thread(target=send_password_email, args=(contact, user['password'], user['name']), daemon=True).start()
        
        return jsonify({"message": "Password resent successfully!"})
    finally:
        db.close()

# Redundant admin routes removed (moved to secured section below)

@app.route("/api/user/request", methods=["POST"])
def user_post_request():
    data = request.json
    db = get_db()
    db.execute("INSERT INTO user_requests (user_id, contact, message) VALUES (?, ?, ?)",
               (data.get('user_id'), data['contact'], data['message']))
    db.commit()
    db.close()
    return jsonify({"message": "Request sent successfully!"})

@app.route("/auth/resend", methods=["POST"])
def resend():
    data = request.json
    contact = data.get('email_phone')
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email_phone = ?", (contact,)).fetchone()
    if user:
        code = ''.join(random.choices(string.digits, k=6))
        db.execute("UPDATE users SET verification_code = ? WHERE id = ?", (code, user['id']))
        db.commit()
        send_verification_code(contact, code)
        db.close()
        return jsonify({"message": "New code sent!"})
    db.close()
    return jsonify({"error": "User not found"}), 404

@app.route("/auth/resend-code", methods=["POST"])
def resend_code():
    data = request.json
    contact = data.get("email_phone")
    if not contact: return jsonify({"error": "Contact required"}), 400
    
    db = get_db()
    user = db.execute("SELECT id FROM users WHERE email_phone = ?", (contact,)).fetchone()
    if not user:
        db.close()
        return jsonify({"error": "User not found"}), 404
    
    new_code = "".join(random.choices(string.digits, k=6))
    db.execute("UPDATE users SET verification_code = ? WHERE email_phone = ?", (new_code, contact))
    db.commit()
    db.close()
    
    send_verification_code(contact, new_code)
    return jsonify({"message": "Code resent successfully"})

@app.route("/auth/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    contact = data.get('email_phone')
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email_phone = ?", (contact,)).fetchone()
    if user:
        code = ''.join(random.choices(string.digits, k=6))
        db.execute("UPDATE users SET verification_code = ? WHERE id = ?", (code, user['id']))
        db.commit()
        send_verification_code(contact, code)
        db.close()
        return jsonify({"message": "Password reset code sent!"})
    db.close()
    return jsonify({"error": "No account found with this email/phone."}), 404

@app.route("/auth/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    contact = data.get('email_phone')
    code = data.get('code')
    new_pass = data.get('password')
    
    if not contact or not code or not new_pass:
        return jsonify({"error": "Missing fields"}), 400
        
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email_phone = ? AND verification_code = ?", (contact, code)).fetchone()
    if user:
        db.execute("UPDATE users SET password = ?, verification_code = NULL WHERE id = ?", (new_pass, user['id']))
        db.commit()
        db.close()
        return jsonify({"message": "Password reset successful! You can now login."})
    db.close()
    return jsonify({"error": "Invalid verification code."}), 400

@app.route("/auth/verify", methods=["POST"])
def verify():
    data = request.json
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email_phone = ? AND verification_code = ?", (data['email_phone'], data['code'])).fetchone()
    if user:
        db.execute("UPDATE users SET verified = 1 WHERE id = ?", (user['id'],))
        db.commit()
        
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        
        user_data = dict(user)
        user_data['verified'] = 1
        db.close()
        return jsonify({
            "message": "Account verified!",
            "token": token,
            "user": user_data
        })
    db.close()
    return jsonify({"error": "Invalid code"}), 400

@app.route("/auth/login", methods=["POST"])
def login():
    data = request.json
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email_phone = ? AND password = ?",
                      (data['email_phone'], data['password'])).fetchone()
    if user:
        if not user['verified']:
            code = user['verification_code']
            send_verification_code(user['email_phone'], code)
            db.close()
            return jsonify({"error": "Account not verified. Code resent.", "unverified": True}), 403
        # Send OTP for login
        otp = ''.join(random.choices(string.digits, k=6))
        db.execute("UPDATE users SET verification_code = ? WHERE id = ?", (otp, user['id']))
        db.commit()
        send_login_otp(user['email_phone'], otp, user['name'])
        db.close()
        return jsonify({"message": "OTP sent to your email. Enter it to complete login.", 
                        "otp_required": True, "email_phone": user['email_phone']})
    db.close()
    return jsonify({"error": "Invalid email/phone or password"}), 401

@app.route("/auth/login-verify", methods=["POST"])
def login_verify():
    data = request.json
    contact = data.get('email_phone')
    otp     = data.get('code')
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email_phone = ? AND verification_code = ?",
                      (contact, otp)).fetchone()
    if user:
        db.execute("UPDATE users SET verification_code = NULL WHERE id = ?", (user['id'],))
        db.commit()
        token = jwt.encode({'user_id': user['id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
                           app.config['SECRET_KEY'])
        db.close()
        return jsonify({"token": token, "user": dict(user)})
    db.close()
    return jsonify({"error": "Invalid or expired OTP"}), 401

@app.route("/auth/resend-otp", methods=["POST"])
def resend_otp():
    """Resend OTP for login verification"""
    data = request.json
    contact = data.get('email_phone')
    if not contact:
        return jsonify({"error": "Email or phone is required"}), 400
    
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email_phone = ?", (contact,)).fetchone()
    
    if not user:
        db.close()
        return jsonify({"error": "User not found"}), 404
    
    # Generate new OTP
    otp = ''.join(random.choices(string.digits, k=6))
    db.execute("UPDATE users SET verification_code = ? WHERE id = ?", (otp, user['id']))
    db.commit()
    
    # Send OTP in background thread
    import threading
    threading.Thread(target=send_login_otp, args=(contact, otp, user['name']), daemon=True).start()
    
    db.close()
    return jsonify({"message": "OTP resent successfully", "email_phone": contact})

#  CORE ROUTES 

@app.route("/api/predict", methods=["POST"])
@token_required
def predict(user):
    print(f"[DEBUG] Predict requested by {user['name']} with data: {request.json}")
    data = request.json
    try:
        # ===== USE PROFESSIONAL BUSINESS RECOMMENDER (DATA-DRIVEN) =====
        # Get top 3 business recommendations from real dataset
        top3_businesses = business_recommender.recommend(data, top_n=3)
        
        # Calculate overall success prediction
        if top3_businesses:
            # Average success rate of recommended businesses
            avg_success_rate = sum(b['success_rate'] for b in top3_businesses) / len(top3_businesses)
            
            # Determine label based on success rate
            if avg_success_rate >= 80:
                pred_label = "Successful"
                pred_class = 2
            elif avg_success_rate >= 60:
                pred_label = "Growing"
                pred_class = 1
            else:
                pred_label = "Struggling"
                pred_class = 0
            
            success_prob = round(avg_success_rate, 1)
        else:
            # Fallback if no businesses match
            pred_label = "Growing"
            pred_class = 1
            success_prob = 65.0
        
        # Format results
        result = {
            "prediction": {
                "class": pred_class,
                "label": pred_label,
                "success_prob": success_prob,
                "overall_score": success_prob,
            },
            "top_3_businesses": top3_businesses
        }

        # Save to DB
        db = get_db()
        db.execute(
            "INSERT INTO predictions (user_id, input_data, result_data) VALUES (?, ?, ?)",
            (user['id'], json.dumps(data), json.dumps(result))
        )
        
        # Update user's sector if provided
        if data.get('sector'):
            db.execute(
                "UPDATE users SET sector = ? WHERE id = ?",
                (data['sector'], user['id'])
            )
            print(f"[DEBUG] Updated sector for user {user['name']}: {data['sector']}")
        
        db.commit()
        db.close()

        print(f"[PREDICT SUCCESS] Recommended {len(top3_businesses)} businesses with {success_prob}% success rate")
        return jsonify(result)
    except Exception as e:
        import traceback
        print(f"[PREDICT ERROR] {traceback.format_exc()}")
        return jsonify({"error": str(e)}), 500

#  PUBLIC CONTENT ROUTES 

@app.route("/api/hustle-data")
def get_hustle_data():
    """Legacy endpoint - kept for backwards compatibility"""
    return jsonify(hustle_stats)

@app.route("/api/businesses")
def get_all_businesses():
    """Get all available businesses from dataset"""
    try:
        businesses = business_recommender.get_all_businesses()
        return jsonify({
            "total": len(businesses),
            "businesses": businesses
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/business/<hustle_name>")
def get_business_details(hustle_name):
    """Get detailed information about a specific business"""
    try:
        details = business_recommender.get_business_details(hustle_name)
        if details is None:
            return jsonify({"error": "Business not found"}), 404
        return jsonify(details)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/businesses/category/<category>")
def get_businesses_by_category(category):
    """Get businesses filtered by category"""
    try:
        businesses = business_recommender.get_businesses_by_category(category)
        return jsonify({
            "category": category,
            "total": len(businesses),
            "businesses": businesses
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/stories")
def get_stories():
    db = get_db()
    rows = db.execute("SELECT * FROM stories ORDER BY created_at DESC").fetchall()
    db.close()
    return jsonify([{
        "name": r["author"],
        "hustle": r["title"],
        "quote": r["content"],
        "tags": r["image_url"] or "Success, Rwanda"
    } for r in rows])

@app.route("/api/announcements")
def get_announcements():
    db = get_db()
    rows = db.execute("SELECT * FROM announcements ORDER BY created_at DESC").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@app.route("/api/user/submit-story", methods=["POST"])
@token_required
def user_submit_story(user):
    data = request.json
    # Accept both field name formats
    story_text  = (data.get('content') or data.get('story', '')).strip()
    hustle_name = (data.get('title')   or data.get('hustle', 'My Hustle')).strip()
    tags        = data.get('tags', 'Success, Rwanda').strip()
    author_name = data.get('name') or user['name']
    if not story_text:
        return jsonify({"error": "Story text is required"}), 400
    db = get_db()
    db.execute(
        "INSERT INTO stories (title, content, author, image_url) VALUES (?, ?, ?, ?)",
        (hustle_name, story_text, author_name, tags)
    )
    db.commit()
    db.close()
    return jsonify({"message": "Your story has been published! "})

#  ADMINISTRATIVE ROUTES 
@app.route("/api/admin/stats")
@token_required
def admin_stats(user):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    db = get_db()
    total_users = db.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    verified_users = db.execute("SELECT COUNT(*) FROM users WHERE verified = 1").fetchone()[0]
    total_predictions = db.execute("SELECT COUNT(*) FROM predictions").fetchone()[0]
    total_requests = db.execute("SELECT COUNT(*) FROM user_requests").fetchone()[0]
    db.close()
    return jsonify({
        "total_users": total_users,
        "verified_users": verified_users,
        "total_predictions": total_predictions,
        "total_requests": total_requests
    })

@app.route("/api/admin/predictions")
@token_required
def admin_predictions(user):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    db = get_db()
    rows = db.execute("""
        SELECT p.id, p.user_id, p.input_data, p.result_data, p.timestamp, u.name as user_name, u.email_phone
        FROM predictions p
        LEFT JOIN users u ON p.user_id = u.id
        ORDER BY p.timestamp DESC
    """).fetchall()
    db.close()
    predictions = []
    for row in rows:
        predictions.append({
            "id": row[0],
            "user_id": row[1],
            "input_data": json.loads(row[2]) if row[2] else {},
            "result_data": json.loads(row[3]) if row[3] else {},
            "timestamp": row[4],
            "user_name": row[5] or "Unknown",
            "email_phone": row[6] or "N/A"
        })
    return jsonify(predictions)

@app.route("/api/admin/users")
@token_required
def admin_users(user):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    db = get_db()
    rows = db.execute("SELECT id, name, email_phone, role, verified, created_at FROM users ORDER BY created_at DESC").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@app.route("/api/user/profile", methods=["PUT"])
@token_required
def update_profile(current_user):
    data = request.json or {}
    db = get_db()
    allowed = ['name', 'employment_status', 'language', 'location', 'sector', 'birthday', 'education_level', 'gender']
    updates = {k: data[k] for k in allowed if k in data}
    if not updates:
        db.close()
        return jsonify({"error": "Nothing to update"}), 400
    updates['profile_complete'] = 1
    set_clause = ", ".join(f"{k} = ?" for k in updates)
    db.execute(f"UPDATE users SET {set_clause} WHERE id = ?", (*updates.values(), current_user['id']))
    db.commit()
    user = db.execute("SELECT * FROM users WHERE id = ?", (current_user['id'],)).fetchone()
    db.close()
    return jsonify({"message": "Profile updated!", "user": dict(user)})

@app.route("/api/user/change-password", methods=["POST"])
@token_required
def change_password(current_user):
    data = request.json or {}
    old_pass = data.get('old_password')
    new_pass = data.get('new_password')
    if not old_pass or not new_pass:
        return jsonify({"error": "Both old and new password required"}), 400
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE id = ? AND password = ?", (current_user['id'], old_pass)).fetchone()
    if not user:
        db.close()
        return jsonify({"error": "Current password is incorrect"}), 400
    db.execute("UPDATE users SET password = ? WHERE id = ?", (new_pass, current_user['id']))
    db.commit()
    db.close()
    return jsonify({"message": "Password changed successfully!"})

@app.route("/api/user/my-predictions")
@token_required
def my_predictions(current_user):
    db = get_db()
    rows = db.execute(
        "SELECT id, input_data, result_data, timestamp FROM predictions WHERE user_id = ? ORDER BY timestamp DESC",
        (current_user['id'],)
    ).fetchall()
    db.close()
    results = []
    for r in rows:
        try:
            inp = json.loads(r['input_data']) if r['input_data'] else {}
            res = json.loads(r['result_data']) if r['result_data'] else {}
            top3 = res.get('top_3_businesses', [])
            results.append({
                'id': r['id'],
                'timestamp': r['timestamp'],
                'location': inp.get('location', ''),
                'capital': inp.get('startup_capital_rwf', 0),
                'skills': inp.get('skills', []),
                'top_business': top3[0]['name'] if top3 else '',
                'top_category': top3[0]['category'] if top3 else '',
                'match_pct': top3[0].get('match_pct', 0) if top3 else 0,
                'top3': top3[:3],
            })
        except:
            pass
    return jsonify(results)

@app.route("/api/user/my-requests")
@token_required
def user_get_requests(user):
    db = get_db()
    rows = db.execute("SELECT * FROM user_requests WHERE user_id = ? ORDER BY created_at DESC", (user['id'],)).fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@app.route("/api/admin/requests")
@token_required
def admin_requests(user):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    db = get_db()
    rows = db.execute("SELECT * FROM user_requests ORDER BY created_at DESC").fetchall()
    db.close()
    return jsonify([dict(r) for r in rows])

@app.route("/api/admin/reply", methods=["POST"])
@token_required
def admin_reply_request(user):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    data = request.json
    db = get_db()
    db.execute("UPDATE user_requests SET reply = ?, replied_at = ?, status = 'Replied' WHERE id = ?",
               (data['reply'], datetime.datetime.now().isoformat(), data['request_id']))
    db.commit()
    db.close()
    return jsonify({"message": "Reply sent successfully!"})

@app.route("/api/admin/stories", methods=["POST"])
@token_required
def admin_add_story(user):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    data = request.json
    db = get_db()
    # Map frontend fields: name -> author, category -> title, story -> content
    db.execute("INSERT INTO stories (title, content, author, image_url) VALUES (?, ?, ?, ?)",
               (data.get('category', 'Success Story'), data.get('story'), data.get('name'), data.get('image')))
    db.commit()
    db.close()
    return jsonify({"message": "Success story published successfully! "})

@app.route("/api/admin/toggle-verify/<int:user_id>", methods=["POST"])
@token_required
def admin_toggle_verify(user, user_id):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    db = get_db()
    u = db.execute("SELECT verified FROM users WHERE id = ?", (user_id,)).fetchone()
    if u:
        new_status = 0 if u['verified'] else 1
        db.execute("UPDATE users SET verified = ? WHERE id = ?", (new_status, user_id))
        db.commit()
        db.close()
        return jsonify({"message": "User status updated successfully."})
    db.close()
    return jsonify({"error": "User not found"}), 404

@app.route("/api/admin/delete-user/<int:user_id>", methods=["DELETE"])
@token_required
def admin_delete_user(user, user_id):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    db = get_db()
    db.execute("DELETE FROM users WHERE id = ?", (user_id,))
    db.commit()
    db.close()
    return jsonify({"message": "User deleted successfully."})

@app.route("/api/admin/backup", methods=["POST"])
@token_required
def admin_backup(user):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify({"message": "Full database backup created successfully (hustle_backup.db)"})

@app.route("/api/admin/update-system", methods=["POST"])
@token_required
def admin_update_system(user):
    if user['role'] != 'support_technician':
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify({"message": "System engine updated with latest market data."})


#  Business Plan 
SWOT_MAP = {
    'Agriculture':         {'strengths':'Low startup cost; High local food demand; BRD agricultural loans available','weaknesses':'Seasonal income; Weather dependent; Requires land access','opportunities':'Export via cooperatives; Growing urban demand; Agri-Connect platform','threats':'Climate change risk; Harvest price volatility; Large-farm competition'},
    'Digital':             {'strengths':'Low overhead; Work from anywhere; High scalability','weaknesses':'Needs reliable internet; Competitive market; Continuous skill updates needed','opportunities':'Rwanda digital economy growth; Smart Rwanda agenda; International clients via Upwork','threats':'Rapid tech changes; Power outages; Currency exchange risk'},
    'Food & Beverage':     {'strengths':'Daily recurring demand; Low entry barrier; Strong community base','weaknesses':'Perishable inventory; RURA certification required; High urban competition','opportunities':'Office/school catering contracts; MoMo Pay adoption; Delivery app reach','threats':'Health regulation changes; Rising ingredient costs; Seasonal demand drops'},
    'Services':            {'strengths':'Minimal inventory; Repeat customer potential; Flexible hours','weaknesses':'Income tied to availability; Trust-building takes time; Hard to scale alone','opportunities':'Growing middle class; WhatsApp Business marketing; Community referral networks','threats':'New market entrants; Price-sensitive customers; Economic downturns'},
    'Trade':               {'strengths':'Established demand; Quick inventory turnover; Flexible product range','weaknesses':'Capital tied in stock; Price competition; Theft and loss risk','opportunities':'Cross-border trade; Jumia Rwanda online selling; Bulk buying cooperatives','threats':'Import price fluctuations; Counterfeit goods; Supermarket competition'},
    'Transport':           {'strengths':'Constant daily demand; App-based steady bookings; Low skill barrier','weaknesses':'High maintenance costs; Fuel price volatility; Physical safety risks','opportunities':'Yegomoto/SafeMotos growth; Corporate delivery contracts; Electric moto subsidies','threats':'Permit and regulation requirements; Accident liability; Ride-hailing competition'},
    'Craft & Manufacturing':{'strengths':'Premium handmade pricing; Cultural and tourism value; Low machinery cost','weaknesses':'Time-intensive production; Quality inconsistency; Limited mass scalability','opportunities':'Hotel and tourist shop supply; Rwanda Cooperative Agency export; Etsy global reach','threats':'Cheap mass-produced imports; Seasonal tourist demand; Raw material price rises'},
}
MARKETING_MAP = {
    'Agriculture':         ['Join agricultural cooperative for bulk sales','Use Agri-Connect platform to find direct buyers','Supply restaurants and hotels directly','Participate in district market days','Apply for BRD agricultural loan at 12% p.a.'],
    'Digital':             ['Build LinkedIn and Behance portfolio with best projects','Offer free business audits as lead generation','Join Rwanda ICT Chamber for networking','Use Upwork and Fiverr for international clients','Charge monthly retainer packages for stable income'],
    'Food & Beverage':     ['Accept MTN MoMo Pay from day one','Partner with offices and schools for bulk orders','Use WhatsApp Business for daily menu updates','Offer loyalty cards for repeat customers','Get RURA hygiene certificate to build trust'],
    'Services':            ['Create WhatsApp Business profile with before/after photos','Ask satisfied clients for referrals with discount incentive','List on local Facebook community groups','Offer free first-time trial or consultation','Collect Google/Facebook reviews from happy clients'],
    'Trade':               ['Use Facebook Marketplace and WhatsApp groups','Offer credit to trusted regular customers','Participate in local market days and fairs','Build relationships with 2-3 reliable wholesalers','Accept MoMo Pay and issue receipts for trust'],
    'Transport':           ['Register on Yegomoto or SafeMotos for app bookings','Build 10-15 regular corporate clients','Use WhatsApp groups for delivery coordination','Offer discounts for bulk or regular bookings','Maintain 5-star rating on apps for more bookings'],
    'Craft & Manufacturing':['Showcase making-of process on Instagram and TikTok','Supply Kigali hotels and tourist shops','Register with Rwanda Cooperative Agency for export','Participate in Made in Rwanda exhibitions','Sell on Etsy and Facebook Marketplace for wider reach'],
}
OPS_MAP = {
    'Agriculture':         ['Secure land access (own, lease, or cooperative)','Purchase seeds/livestock from certified suppliers','Set up irrigation or water access system','Register with local agricultural cooperative','Establish supply agreements with buyers before planting'],
    'Digital':             ['Set up reliable internet (MTN/Airtel fiber)','Create profiles on Upwork, Fiverr, LinkedIn','Invest in laptop and UPS backup power','Register business with RDB (10,000 RWF)','Set up MoMo for receiving payments'],
    'Food & Beverage':     ['Obtain RURA food hygiene certificate','Source ingredients from reliable wholesale suppliers','Set up clean preparation area meeting health standards','Register with local sector office','Set up MoMo Pay account for cashless transactions'],
    'Services':            ['Obtain required professional certification (IPRC/RURA)','Purchase necessary tools and equipment','Register business with RDB for credibility','Set up WhatsApp Business account','Create simple pricing menu for all services'],
    'Trade':               ['Identify and visit 3 reliable wholesale suppliers','Secure storage space (own or rented)','Register with RDB and obtain trading license','Set up inventory tracking system','Open business mobile money account'],
    'Transport':           ['Ensure vehicle/bike is in excellent condition','Obtain all required permits (PSV, insurance)','Register on ride-hailing apps if applicable','Set up maintenance schedule and emergency fund','Build contact list of regular clients'],
    'Craft & Manufacturing':['Source raw materials from local cooperatives','Set up production workspace with proper tools','Develop quality control standards','Register with Rwanda Cooperative Agency','Create product catalog with photos for marketing'],
}
PRICING_MAP = {
    'Agriculture':         'Cost-plus pricing: calculate total production cost and add 40-60% margin. Adjust for seasonal demand peaks.',
    'Digital':             'Value-based pricing: charge based on client ROI. Offer starter (50K), standard (100K), and premium (200K+) monthly packages.',
    'Food & Beverage':     'Competitive pricing: match local market rates. Offer bundle deals (e.g. 5 meals for price of 4) to increase volume.',
    'Services':            'Hourly or fixed-rate pricing. Offer package deals for repeat customers. Premium pricing for urgent/emergency services.',
    'Trade':               'Markup pricing: buy wholesale, sell at 20-40% markup. Offer bulk discounts to attract larger orders.',
    'Transport':           'Per-trip or monthly contract pricing. App-based pricing follows platform rates. Negotiate corporate rates for regular clients.',
    'Craft & Manufacturing':'Premium pricing for handmade quality. Tiered pricing by size/complexity. Export pricing 2-3x local market rate.',
}
DISTRIBUTION_MAP = {
    'Agriculture':         'Direct farm-to-consumer, cooperative bulk sales, local market stalls, restaurant/hotel supply contracts.',
    'Digital':             'Online delivery via email/cloud. In-person for local clients. International via freelance platforms.',
    'Food & Beverage':     'Fixed location stall, office delivery, school canteen supply, catering events.',
    'Services':            'Home/office visits, fixed workshop location, WhatsApp booking system.',
    'Trade':               'Physical shop/stall, WhatsApp orders with delivery, market days, online via Facebook Marketplace.',
    'Transport':           'App-based bookings (Yegomoto/SafeMotos), direct client calls, corporate contracts.',
    'Craft & Manufacturing':'Market stalls, hotel/tourist shop supply, online (Etsy/Facebook), export via cooperatives.',
}
RETENTION_MAP = {
    'Agriculture':         'Consistent quality and timely delivery. Loyalty discounts for regular buyers. WhatsApp updates on fresh stock.',
    'Digital':             'Monthly performance reports to clients. Proactive improvement suggestions. Loyalty discounts after 3 months.',
    'Food & Beverage':     'Loyalty cards (buy 10 get 1 free). Consistent taste and hygiene. WhatsApp menu updates and special offers.',
    'Services':            'Follow-up calls after service. Referral discounts. Seasonal promotions for returning customers.',
    'Trade':               'Credit terms for trusted customers. Loyalty discounts on bulk orders. Consistent stock availability.',
    'Transport':           'Punctuality and reliability. Preferred customer rates. WhatsApp check-ins for regular clients.',
    'Craft & Manufacturing':'Custom orders for repeat customers. Quality guarantee. Showcase customer products on social media.',
}

def _find_kb_key(hustle_name):
    if hustle_name in business_kb: return hustle_name
    hn = hustle_name.lower()
    for k in business_kb:
        if k.lower() == hn or hn in k.lower() or k.lower() in hn: return k
    if hustle_name in hustle_stats:
        cat = hustle_stats[hustle_name].get('category','')
        for k,v in business_kb.items():
            if v.get('category') == cat: return k
    return None

def _build_plan(hustle_name, user_profile):
    kb_key = _find_kb_key(hustle_name)
    if kb_key:
        kb = business_kb[kb_key]
    else:
        stats = hustle_stats.get(hustle_name, {})
        rev = stats.get('avg_revenue', 100000)
        kb = {'category': stats.get('category','Services'), 'avg_capital': stats.get('avg_capital',100000),
              'min_capital': stats.get('avg_capital',50000), 'avg_monthly_revenue': rev,
              'avg_monthly_expenses': round(rev*0.6), 'avg_monthly_profit': stats.get('avg_profit', round(rev*0.4)),
              'avg_profit_margin_pct': 40, 'avg_hours_per_week': stats.get('avg_hours_per_week',20),
              'avg_growth_rate': 10, 'avg_break_even': 6, 'success_rate': 70,
              'risk_level':'Medium','competition_level':'Medium','demand_level':'Medium',
              'skills_required':'General skills','uses_social_media':'Yes','avg_online_sales_pct':20,
              'avg_customer_satisfaction':4.0,'avg_repeat_customers_pct':40,
              'seasonality':'No','gov_support':'No','preferred_location_type':'Urban',
              'internet_needed':False,'count':0}

    user_capital = float(user_profile.get('capital', kb['avg_capital']))
    ratio = min(user_capital / max(kb['avg_capital'], 1), 1.5)
    rev   = round(kb['avg_monthly_revenue'] * ratio)
    exp   = round(kb['avg_monthly_expenses'] * ratio)
    prof  = round(kb['avg_monthly_profit'] * ratio)
    gr    = kb.get('avg_growth_rate', 10)

    monthly = []
    for m in range(1, 13):
        g = 1 + (gr / 100 / 12) * (m - 1)
        monthly.append({'month': m, 'revenue': round(rev*g), 'expenses': round(exp*g*0.98), 'profit': round((rev-exp)*g)})

    yearly = [
        {'year':1,'revenue':rev*12,'profit':prof*12},
        {'year':2,'revenue':round(rev*12*(1+gr/100)),'profit':round(prof*12*(1+gr/100)*1.05)},
        {'year':3,'revenue':round(rev*12*(1+gr/100)**2),'profit':round(prof*12*(1+gr/100)**2*1.1)},
    ]
    cat = kb['category']
    return {
        'hustle_name': hustle_name, 'kb_name': kb_key or hustle_name,
        'category': cat, 'user_profile': user_profile,
        'generated_at': datetime.datetime.utcnow().isoformat(),
        'kb_data': kb,
        'financials': {
            'user_capital': user_capital, 'estimated_monthly_revenue': rev,
            'estimated_monthly_expenses': exp, 'estimated_monthly_profit': prof,
            'profit_margin_pct': kb.get('avg_profit_margin_pct', 40),
            'break_even_months': kb.get('avg_break_even', 6),
            'monthly_projections': monthly, 'yearly_projections': yearly,
        },
        'swot': SWOT_MAP.get(cat, SWOT_MAP['Services']),
        'marketing_strategies': MARKETING_MAP.get(cat, MARKETING_MAP['Services']),
        'pricing_strategy': PRICING_MAP.get(cat, PRICING_MAP['Services']),
        'distribution_channels': DISTRIBUTION_MAP.get(cat, DISTRIBUTION_MAP['Services']),
        'customer_retention': RETENTION_MAP.get(cat, RETENTION_MAP['Services']),
        'operations_plan': OPS_MAP.get(cat, OPS_MAP['Services']),
    }


def _generate_pdf(plan, output_path):
    """Generate a professional PDF business plan using reportlab"""
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                            rightMargin=72, leftMargin=72,
                            topMargin=72, bottomMargin=18)
    
    # Container for PDF elements
    story = []
    
    # Define styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#2563eb'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#1e40af'),
        spaceAfter=12,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    subheading_style = ParagraphStyle(
        'CustomSubHeading',
        parent=styles['Heading3'],
        fontSize=13,
        textColor=colors.HexColor('#334155'),
        spaceAfter=8,
        spaceBefore=8,
        fontName='Helvetica-Bold'
    )
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=10,
        alignment=TA_LEFT
    )
    
    # Title
    story.append(Paragraph("BUSINESS PLAN", title_style))
    story.append(Paragraph(f"<b>{plan['hustle_name']}</b>", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Executive Summary
    user = plan['user_profile']
    kb = plan['kb_data']
    fin = plan['financials']
    
    story.append(Paragraph("Executive Summary", heading_style))
    summary_text = f"""
    <b>Business Owner:</b> {user.get('name', 'Entrepreneur')}<br/>
    <b>Business Type:</b> {plan['hustle_name']} ({plan['category']})<br/>
    <b>Location:</b> {user.get('location', 'Rwanda')}<br/>
    <b>Initial Capital:</b> {fin['user_capital']:,.0f} RWF<br/>
    <b>Projected Monthly Profit:</b> {fin['estimated_monthly_profit']:,.0f} RWF<br/>
    <b>Break-Even Time:</b> {fin['break_even_months']} months<br/>
    <b>Success Rate:</b> {kb.get('success_rate', 70)}%
    """
    story.append(Paragraph(summary_text, normal_style))
    story.append(Spacer(1, 0.3*inch))
    
    # Business Description
    story.append(Paragraph("Business Description", heading_style))
    desc_text = f"""
    This business plan outlines the strategy for establishing and operating a {plan['hustle_name']} 
    business in {user.get('location', 'Rwanda')}. The business falls under the {plan['category']} category 
    and requires an initial investment of {fin['user_capital']:,.0f} RWF.
    """
    story.append(Paragraph(desc_text, normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Owner Profile
    story.append(Paragraph("Owner Profile", heading_style))
    profile_data = [
        ['Attribute', 'Details'],
        ['Name', user.get('name', '—')],
        ['Age', str(user.get('age', '—'))],
        ['Gender', user.get('gender', '—')],
        ['Education', user.get('education_level', '—')],
        ['Employment Status', user.get('employment_status', '—')],
        ['Available Hours/Day', str(user.get('hoursPerDay', 4))],
        ['Skills', ', '.join(user.get('skills', [])) if isinstance(user.get('skills'), list) else str(user.get('skills', '—'))],
    ]
    profile_table = Table(profile_data, colWidths=[2*inch, 4*inch])
    profile_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2563eb')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    story.append(profile_table)
    story.append(Spacer(1, 0.3*inch))
    
    # Financial Projections
    story.append(Paragraph("Financial Projections", heading_style))
    
    # Monthly Projections (first 6 months)
    story.append(Paragraph("Monthly Projections (First 6 Months)", subheading_style))
    monthly_data = [['Month', 'Revenue (RWF)', 'Expenses (RWF)', 'Profit (RWF)']]
    for m in fin['monthly_projections'][:6]:
        monthly_data.append([
            str(m['month']),
            f"{m['revenue']:,.0f}",
            f"{m['expenses']:,.0f}",
            f"{m['profit']:,.0f}"
        ])
    monthly_table = Table(monthly_data, colWidths=[1*inch, 1.5*inch, 1.5*inch, 1.5*inch])
    monthly_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e40af')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
        ('BACKGROUND', (0, 1), (-1, -1), colors.lightblue),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    story.append(monthly_table)
    story.append(Spacer(1, 0.2*inch))
    
    # Yearly Projections
    story.append(Paragraph("Yearly Projections (3 Years)", subheading_style))
    yearly_data = [['Year', 'Annual Revenue (RWF)', 'Annual Profit (RWF)']]
    for y in fin['yearly_projections']:
        yearly_data.append([
            str(y['year']),
            f"{y['revenue']:,.0f}",
            f"{y['profit']:,.0f}"
        ])
    yearly_table = Table(yearly_data, colWidths=[1.5*inch, 2*inch, 2*inch])
    yearly_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e40af')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
        ('BACKGROUND', (0, 1), (-1, -1), colors.lightgreen),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    story.append(yearly_table)
    story.append(Spacer(1, 0.3*inch))
    
    # SWOT Analysis
    story.append(PageBreak())
    story.append(Paragraph("SWOT Analysis", heading_style))
    
    swot = plan['swot']
    story.append(Paragraph("<b>Strengths</b>", subheading_style))
    for s in swot['strengths']:
        story.append(Paragraph(f"• {s}", normal_style))
    
    story.append(Paragraph("<b>Weaknesses</b>", subheading_style))
    for w in swot['weaknesses']:
        story.append(Paragraph(f"• {w}", normal_style))
    
    story.append(Paragraph("<b>Opportunities</b>", subheading_style))
    for o in swot['opportunities']:
        story.append(Paragraph(f"• {o}", normal_style))
    
    story.append(Paragraph("<b>Threats</b>", subheading_style))
    for t in swot['threats']:
        story.append(Paragraph(f"• {t}", normal_style))
    
    story.append(Spacer(1, 0.3*inch))
    
    # Marketing Strategy
    story.append(Paragraph("Marketing Strategy", heading_style))
    for strategy in plan['marketing_strategies']:
        story.append(Paragraph(f"• {strategy}", normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Pricing Strategy
    story.append(Paragraph("Pricing Strategy", heading_style))
    story.append(Paragraph(plan['pricing_strategy'], normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Distribution Channels
    story.append(Paragraph("Distribution Channels", heading_style))
    story.append(Paragraph(plan['distribution_channels'], normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Customer Retention
    story.append(Paragraph("Customer Retention Strategy", heading_style))
    story.append(Paragraph(plan['customer_retention'], normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Operations Plan
    story.append(Paragraph("Operations Plan", heading_style))
    story.append(Paragraph(plan['operations_plan'], normal_style))
    story.append(Spacer(1, 0.3*inch))
    
    # Footer
    story.append(Spacer(1, 0.5*inch))
    footer_text = f"""
    <i>Generated by RwandaHustle on {datetime.datetime.now().strftime('%B %d, %Y')}</i><br/>
    <i>© 2024 RwandaHustle - Empowering Entrepreneurs across Rwanda</i>
    """
    story.append(Paragraph(footer_text, ParagraphStyle('Footer', parent=styles['Normal'], 
                                                       fontSize=9, textColor=colors.grey, 
                                                       alignment=TA_CENTER)))
    
    # Build PDF
    doc.build(story)
    print(f"[PDF] Generated successfully at {output_path}")


@app.route('/api/business-plan', methods=['POST', 'OPTIONS'])
def generate_business_plan():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    data         = request.json or {}
    hustle_name  = data.get('hustle_name', '')
    user_profile = data.get('user_profile', {})
    fmt_type     = data.get('format', 'json')

    plan = _build_plan(hustle_name, user_profile)

    if fmt_type == 'pdf':
        try:
            tmp = tempfile.NamedTemporaryFile(suffix='.pdf', delete=False)
            tmp.close()
            _generate_pdf(plan, tmp.name)
            safe = re.sub(r'[^\w\s-]','', hustle_name).strip().replace(' ','_')
            user_name = re.sub(r'[^\w\s-]','', user_profile.get('name', 'Entrepreneur')).strip().replace(' ','_')
            return send_file(tmp.name, as_attachment=True,
                download_name=f"BusinessPlan_{user_name}_{safe}.pdf",
                mimetype='application/pdf')
        except Exception as e:
            print(f"[PDF ERROR] {e}")
            import traceback
            traceback.print_exc()
            return jsonify({'error': str(e)}), 500

    if fmt_type == 'docx':
        try:
            kb  = plan['kb_data']
            fin = plan['financials']
            biz_payload = {
                'hustle_type': plan['hustle_name'], 'category': plan['category'],
                'min_capital': kb.get('min_capital', fin['user_capital']),
                'avg_capital': kb.get('avg_capital', fin['user_capital']),
                'avg_monthly_revenue': fin['estimated_monthly_revenue'],
                'avg_monthly_expenses': fin['estimated_monthly_expenses'],
                'avg_monthly_profit': fin['estimated_monthly_profit'],
                'avg_profit_margin_pct': fin['profit_margin_pct'],
                'avg_hours_per_week': kb.get('avg_hours_per_week', 20),
                'avg_growth_rate': kb.get('avg_growth_rate', 10),
                'avg_break_even': fin['break_even_months'],
                'success_rate': kb.get('success_rate', 70),
                'risk_level': kb.get('risk_level','Medium'),
                'competition_level': kb.get('competition_level','Medium'),
                'demand_level': kb.get('demand_level','Medium'),
                'skills_required': kb.get('skills_required',''),
                'uses_social_media': kb.get('uses_social_media','Yes'),
                'avg_online_sales_pct': kb.get('avg_online_sales_pct', 0),
                'avg_customer_satisfaction': kb.get('avg_customer_satisfaction', 4.0),
                'avg_repeat_customers_pct': kb.get('avg_repeat_customers_pct', 30),
                'seasonality': kb.get('seasonality','No'),
                'gov_support': kb.get('gov_support','No'),
                'preferred_location_type': kb.get('preferred_location_type','Urban'),
                'internet_needed': kb.get('internet_needed', False),
                'target_customers': f"Local community in {user_profile.get('location','Rwanda')} and surrounding areas",
                'marketing_strategies': ', '.join(plan['marketing_strategies']),
                'swot_strengths': plan['swot']['strengths'],
                'swot_weaknesses': plan['swot']['weaknesses'],
                'swot_opportunities': plan['swot']['opportunities'],
                'swot_threats': plan['swot']['threats'],
            }
            profile_payload = {
                'name': user_profile.get('name','Entrepreneur'),
                'age': user_profile.get('age','—'),
                'gender': user_profile.get('gender','—'),
                'education': user_profile.get('education_level','—'),
                'employment': user_profile.get('employment_status','—'),
                'location': user_profile.get('location','Rwanda'),
                'location_type': 'Urban',
                'capital': fin['user_capital'],
                'hours_per_day': user_profile.get('hoursPerDay', 4),
                'has_internet': True,
                'skills': user_profile.get('skills', []),
            }
            tmp = tempfile.NamedTemporaryFile(suffix='.docx', delete=False)
            tmp.close()
            js_input = json.dumps({'profile': profile_payload, 'business': biz_payload, 'output_path': tmp.name})
            js_path  = os.path.join(BASE_DIR, 'generate_business_plan.js')
            result   = subprocess.run(['node', js_path], input=js_input, capture_output=True, text=True, timeout=30)
            if result.returncode != 0:
                print(f"[DOCX ERROR] {result.stderr}")
                return jsonify({'error': 'DOCX generation failed', 'detail': result.stderr}), 500
            safe = re.sub(r'[^\w\s-]','', hustle_name).strip().replace(' ','_')
            return send_file(tmp.name, as_attachment=True,
                download_name=f"BusinessPlan_{safe}.docx",
                mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        except Exception as e:
            print(f"[DOCX ERROR] {e}")
            return jsonify({'error': str(e)}), 500

    return jsonify(plan)


#  Serve React SPA 
@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>', methods=['GET'])
def serve_react(path):
    if path != '' and os.path.exists(os.path.join(DIST_DIR, path)):
        return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, 'index.html')

if __name__ == "__main__":
    print(f"\nRwandaHustle running at http://localhost:5000\n")
    app.run(host="0.0.0.0", port=5000, debug=True)
