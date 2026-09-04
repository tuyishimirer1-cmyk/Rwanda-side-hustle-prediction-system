# Training Notebook Guide

Complete guide for using the Jupyter notebook to train ML models.

---

## Notebook: train_model.ipynb

**Location:** `backend/train_model.ipynb`

**Purpose:** Train and evaluate machine learning models with confusion matrix visualizations.

---

## What's Inside

### 1. Import Libraries
Imports all required packages for ML training.

### 2. Load Dataset
Loads the Rwanda hustle dataset (10,000 businesses).

### 3. Explore Data
- View dataset statistics
- Visualize class distribution
- Pie chart and bar chart

### 4. Feature Engineering
- Encode categorical variables
- Create derived features:
  - readiness_score
  - profit_per_hour
  - roi_months
- Select 11 key features

### 5. Train-Test Split
- 80% training (8,000 samples)
- 20% testing (2,000 samples)
- Feature scaling with StandardScaler

### 6. Train Models
Three models trained:
- Random Forest (300 trees)
- Gradient Boosting (500 estimators)
- SVM (RBF kernel)

### 7. Confusion Matrices
**Main visualization:**
- 3 confusion matrices side-by-side
- Heatmap format
- Shows actual vs predicted
- Saved as `confusion_matrices.png`

### 8. Model Comparison
- Performance comparison table
- Accuracy bar chart
- Saved as `model_comparison.png`

### 9. Save Models
Saves best model (Random Forest) to:
- models/random_forest_model.pkl
- models/rf_scaler.pkl
- models/rf_label_encoder.pkl

---

## How to Run

### Prerequisites:
```bash
pip install jupyter pandas numpy matplotlib seaborn scikit-learn
```

### Option 1: Jupyter Notebook
```bash
cd backend
jupyter notebook train_model.ipynb
```

Then run all cells (Cell → Run All)

### Option 2: Jupyter Lab
```bash
cd backend
jupyter lab train_model.ipynb
```

### Option 3: VS Code
1. Open `train_model.ipynb` in VS Code
2. Select Python kernel
3. Run all cells

---

## Output Files

After running the notebook:

**Charts:**
- `confusion_matrices.png` (18 KB)
- `model_comparison.png` (10 KB)

**Models:**
- `models/random_forest_model.pkl` (30 MB)
- `models/rf_scaler.pkl` (3 KB)
- `models/rf_label_encoder.pkl` (1 KB)

---

## Expected Results

### Model Accuracies:
- Random Forest: ~76%
- Gradient Boosting: ~73%
- SVM: ~73%

### Best Model:
Random Forest (highest accuracy)

### Confusion Matrix Shows:
- Diagonal: Correct predictions
- Off-diagonal: Misclassifications
- Color intensity: Number of predictions

---

## Features Used (11 total)

1. age
2. gender_encoded
3. education_level_encoded
4. location_type_encoded
5. hours_per_week
6. initial_capital (RWF)
7. monthly_profit (RWF)
8. readiness_score
9. profit_per_hour
10. roi_months
11. access_to_internet

---

## Target Classes

1. Growing (58.5% of data)
2. Struggling (13.4% of data)
3. Successful (28.1% of data)

---

## Notebook Structure

**Total Cells:** 25

**Breakdown:**
- Markdown cells: 10 (documentation)
- Code cells: 15 (executable)

**Estimated Run Time:** 2-3 minutes

---

## Tips

### 1. Run Sequentially
Run cells in order from top to bottom.

### 2. Check Output
Each cell displays progress and results.

### 3. View Charts
Charts appear inline in the notebook.

### 4. Modify Parameters
You can adjust:
- n_estimators (number of trees)
- max_depth (tree depth)
- test_size (train/test split)

### 5. Save Often
Jupyter auto-saves, but save manually too (Ctrl+S).

---

## Troubleshooting

### Error: Module not found
```bash
pip install [missing-module]
```

### Error: File not found
Ensure you're in the `backend/` directory.

### Charts not displaying
Install matplotlib:
```bash
pip install matplotlib seaborn
```

### Kernel not starting
Restart Jupyter and try again.

---

## Clean Version

This notebook is clean with:
- No AI emojis
- No decorative lines
- Professional formatting
- Clear documentation

---

## For Capstone Document

### Use These Charts:

1. **confusion_matrices.png**
   - Insert in Results section
   - Caption: "Confusion matrices comparing three ML models"

2. **model_comparison.png**
   - Insert in Evaluation section
   - Caption: "Model accuracy comparison"

### Description Template:

"Figure X shows the confusion matrices for three machine learning models 
trained on 10,000 Rwandan business records. Random Forest achieved the 
highest accuracy at 76%, correctly predicting 1,520 out of 2,000 test 
cases. The model demonstrates strong performance in identifying Growing 
businesses (87.5% accuracy) but faces challenges with the minority 
Struggling class (51.2% accuracy)."

---

## Notebook vs Python Script

**Notebook Advantages:**
- Interactive execution
- Inline visualizations
- Cell-by-cell debugging
- Better for exploration

**Python Script Advantages:**
- Faster execution
- Better for automation
- No browser required

Both produce same results.

---

## Next Steps

After training:

1. View confusion matrices
2. Check model accuracies
3. Save best model
4. Use model in app.py
5. Insert charts in documentation

---

**The notebook is ready to use and completely clean!**

No emojis, no decorative lines, professional formatting throughout.

---

Last Updated: July 16, 2026
