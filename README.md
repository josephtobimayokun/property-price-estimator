I'm# 🏠 Property Price Estimator

> AI-powered Nigerian property price estimator built with PyTorch MLP, FastAPI, and React

![Python](https://img.shields.io/badge/Python-3.10-blue)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0-red)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100-green)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Live-brightgreen)

---

## 🌐 Live Demo

| | Link |
|---|---|
| **Frontend** | https://property-price-estimator-ecru.vercel.app |
| **API** | https://property-price-estimator-99f3.onrender.com |
| **API Docs** | https://property-price-estimator-99f3.onrender.com/docs |

---

## 🌍 Overview

**Property Price Estimator** is a full-stack machine learning application that predicts Nigerian property prices in real time. Users select a property type, location, and features — and the app instantly returns an AI-powered market valuation.

Built on **24,326 real Nigerian property listings** across **25 states** and **189 towns**.

---

## ✨ Features

- 🔮 Real-time price predictions powered by a PyTorch MLP model
- 🗺 Covers 25 Nigerian states and 189 towns
- 🏘 Supports 7 property types — Detached Duplex, Bungalow, Block of Flats and more
- 📊 Returns estimated price, price range floor/ceiling, and confidence score
- 💡 Market insight generated per prediction
- 📱 Fully responsive — works on mobile and desktop
- ⚡ Fast inference via FastAPI REST API

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| ML Model | PyTorch MLP (2 hidden layers, 256→128→64→1) |
| Backend | FastAPI (Python) |
| Frontend | React + Vite |
| Training | K-Fold Cross Validation |
| Encoding | One-Hot Encoding (pd.get_dummies) |
| Backend Deployment | Render |
| Frontend Deployment | Vercel |

---

## 🧠 Model Architecture

```
Input Layer (228 features)
        ↓
LazyLinear → 256 neurons → ReLU → 
        ↓
Linear → 128 neurons → ReLU → 
        ↓
Linear → 64 neurons → ReLU
        ↓
Linear → 1 output (log price)
        ↓
torch.exp() → Predicted Price (₦)
```

**Training Details:**
- Dataset: 24,326 Nigerian property listings
- Target: log(price) for numerical stability
- Validation strategy: K-Fold Cross Validation
- Average Validation Loss: ~0.48
- Optimizer: Stochastic gradient descent
- Regularization: weight decay

---

## 🔌 API Reference

### GET /
Health check endpoint.

**Response:**
```json
{"status": "NaijaEstimate API is running"}
```

### POST /predict

**Request:**
```json
{
  "bedrooms": 3,
  "bathrooms": 2,
  "toilets": 2,
  "parking_space": 1,
  "title": "Detached Duplex",
  "state": "Lagos",
  "town": "Lekki"
}
```

**Response:**
```json
{
  "estimated_price": 85000000,
  "price_range_low": 72250000,
  "price_range_high": 97750000,
  "confidence_score": 82,
  "market_insight": "Estimated value for a Detached Duplex in Lekki, Lagos based on 3 bedrooms and 2 bathrooms."
}
```

---

## 📁 Project Structure

```
property-price-estimator/
├── backend/
│   ├── main.py           # FastAPI server and predict endpoint
│   ├── mlp.params        # Trained PyTorch model weights
│   └── requirements.txt  # Python dependencies
│
└── frontend/
    ├── src/
    │   └── App.jsx       # React app with API integration
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Running Locally

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at: `http://localhost:8000`
Interactive docs: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:5173`

---

## 📊 Dataset

- **Source:** Kaggle — Nigerian Houses Price Dataset
- **Size:** 24,326 listings
- **States:** 25 Nigerian states
- **Towns:** 189 towns
- **Features:** bedrooms, bathrooms, toilets, parking space, property type, state, town
- **Target:** Sale price (₦)

---

## 👤 Author

**Joseph Tobi Mayokun**
- GitHub: [@josephtobimayokun](https://github.com/josephtobimayokun)
- LinkedIn: [joseph-tobi-063576361](https://www.linkedin.com/in/joseph-tobi-063576361)
- Founder: Microlink — AI-focused tech startup

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

> Built with ❤️ in Nigeria 🇳🇬
