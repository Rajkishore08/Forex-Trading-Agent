import requests
import numpy as np
from sklearn.linear_model import LinearRegression

def fetch_forex_data():
    response = requests.get("https://api.forexrates.com/latest")
    return response.json()["rates"]

def predict_market_movement():
    forex_data = fetch_forex_data()
    X = np.array(range(len(forex_data))).reshape(-1, 1)
    y = np.array(list(forex_data.values()))
    
    model = LinearRegression()
    model.fit(X, y)
    
    trend = model.predict([[len(forex_data) + 1]])
    return "UP" if trend > y[-1] else "DOWN"

if __name__ == "__main__":
    prediction = predict_market_movement()
    print("AI Prediction:", prediction)
