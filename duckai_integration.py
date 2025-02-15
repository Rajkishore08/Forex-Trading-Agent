import requests

class DuckAIIntegration:
    def __init__(self):
        self.duckai_url = "https://api.duckai.network/analyze"
    
    def get_trade_insights(self, forex_data):
        payload = {"market_data": forex_data}
        response = requests.post(self.duckai_url, json=payload)
        return response.json() if response.status_code == 200 else None

# Example Usage
if __name__ == "__main__":
    duckai = DuckAIIntegration()
    sample_data = {"cUSD": 1.0, "cEUR": 1.08}
    insights = duckai.get_trade_insights(sample_data)
    print(insights)
