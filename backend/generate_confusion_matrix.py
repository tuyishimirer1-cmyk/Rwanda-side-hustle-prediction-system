"""
Generate Confusion Matrix Image
Run this to create confusion_matrices.png
"""
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix
import warnings
warnings.filterwarnings('ignore')

print("Loading dataset...")
df = pd.read_csv('rwanda_side_hustle_10000.csv')
print(f"Loaded {len(df)} records")

print("\nPreparing features...")
# Encode categorical
le_gender = LabelEncoder()
le_education = LabelEncoder()
le_location = LabelEncoder()

df['gender_encoded'] = le_gender.fit_transform(df['gender'])
df['education_level_encoded'] = le_education.fit_transform(df['education_level'])
df['location_type_encoded'] = le_location.fit_transform(df['location_type'])

# Create features
df['has_training'] = (df['has_training'] == 'Yes').astype(int)
df['business_plan'] = (df['business_plan'] == 'Yes').astype(int)
df['access_to_internet'] = (df['access_to_internet'] == 'Yes').astype(int)
df['readiness_score'] = df['has_training'] + df['business_plan'] + df['access_to_internet']

df['profit_per_hour'] = df['monthly_profit (RWF)'] / (df['hours_per_week'] * 4.33)
df['profit_per_hour'] = df['profit_per_hour'].fillna(0)

df['roi_months'] = df['initial_capital (RWF)'] / (df['monthly_profit (RWF)'] + 1)
df['roi_months'] = df['roi_months'].fillna(999).clip(upper=999)

# Select features
feature_columns = [
    'age', 'gender_encoded', 'education_level_encoded', 'location_type_encoded',
    'hours_per_week', 'initial_capital (RWF)', 'monthly_profit (RWF)',
    'readiness_score', 'profit_per_hour', 'roi_months', 'access_to_internet'
]

X = df[feature_columns]
y = df['success_status']

# Encode target
le_target = LabelEncoder()
y_encoded = le_target.fit_transform(y)

print(f"Features: {len(feature_columns)}")
print(f"Classes: {list(le_target.classes_)}")

print("\nSplitting data...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

print("\nScaling features...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"Train: {len(X_train)}, Test: {len(X_test)}")

# Train models
print("\nTraining Random Forest...")
rf_model = RandomForestClassifier(n_estimators=300, max_depth=15, random_state=42, n_jobs=-1)
rf_model.fit(X_train_scaled, y_train)
rf_pred = rf_model.predict(X_test_scaled)
rf_acc = accuracy_score(y_test, rf_pred)
print(f"  Accuracy: {rf_acc*100:.2f}%")

print("\nTraining Gradient Boosting...")
gb_model = GradientBoostingClassifier(n_estimators=500, learning_rate=0.1, max_depth=5, random_state=42)
gb_model.fit(X_train_scaled, y_train)
gb_pred = gb_model.predict(X_test_scaled)
gb_acc = accuracy_score(y_test, gb_pred)
print(f"  Accuracy: {gb_acc*100:.2f}%")

print("\nTraining SVM...")
svm_model = SVC(C=10.0, kernel='rbf', random_state=42)
svm_model.fit(X_train_scaled, y_train)
svm_pred = svm_model.predict(X_test_scaled)
svm_acc = accuracy_score(y_test, svm_pred)
print(f"  Accuracy: {svm_acc*100:.2f}%")

# Create confusion matrices
print("\nGenerating confusion matrices...")
fig, axes = plt.subplots(1, 3, figsize=(20, 6))
fig.suptitle('Confusion Matrices - Model Comparison', fontsize=18, fontweight='bold', y=1.02)

models = [
    ('Random Forest', rf_pred, rf_acc),
    ('Gradient Boosting', gb_pred, gb_acc),
    ('SVM', svm_pred, svm_acc)
]

for idx, (name, predictions, accuracy) in enumerate(models):
    cm = confusion_matrix(y_test, predictions)
    
    sns.heatmap(
        cm, annot=True, fmt='d', cmap='Blues', cbar=True,
        xticklabels=le_target.classes_,
        yticklabels=le_target.classes_,
        ax=axes[idx], square=True, linewidths=1, linecolor='gray',
        annot_kws={'size': 12, 'weight': 'bold'}
    )
    
    axes[idx].set_title(f'{name}\nAccuracy: {accuracy*100:.2f}%', fontsize=14, fontweight='bold', pad=15)
    axes[idx].set_xlabel('Predicted', fontsize=12, fontweight='bold')
    axes[idx].set_ylabel('Actual', fontsize=12, fontweight='bold')
    axes[idx].tick_params(labelsize=11)

plt.tight_layout(rect=[0, 0, 1, 0.98])
plt.savefig('confusion_matrices.png', dpi=300, bbox_inches='tight')
print("\nSaved: confusion_matrices.png")

# Also create comparison chart
print("\nGenerating model comparison chart...")
plt.figure(figsize=(10, 6))
accuracies = [rf_acc*100, gb_acc*100, svm_acc*100]
model_names = ['Random Forest', 'Gradient Boosting', 'SVM']

bars = plt.bar(model_names, accuracies, color=['#2563eb', '#10b981', '#f59e0b'], alpha=0.8, edgecolor='black')

for bar, acc in zip(bars, accuracies):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height(),
             f'{acc:.2f}%', ha='center', va='bottom', fontsize=12, fontweight='bold')

plt.ylabel('Accuracy (%)', fontsize=12, fontweight='bold')
plt.title('Model Accuracy Comparison', fontsize=14, fontweight='bold')
plt.ylim(0, 100)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig('model_comparison.png', dpi=300, bbox_inches='tight')
print("Saved: model_comparison.png")

print("\nDONE!")
print("Files created:")
print("  - confusion_matrices.png (3 confusion matrices)")
print("  - model_comparison.png (accuracy bar chart)")
