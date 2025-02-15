import requests

class MechAgent:
    def __init__(self):
        self.mech_url = "https://mech.marketplace/api/register"
    
    def register_agent(self, name, strategy):
        payload = {"name": name, "strategy": strategy}
        response = requests.post(self.mech_url, json=payload)
        return response.json() if response.status_code == 200 else None

    def execute_trade(self, trade_data):
        trade_url = "https://mech.marketplace/api/trade"
        response = requests.post(trade_url, json=trade_data)
        return response.json()

# Example Usage
if __name__ == "__main__":
    agent = MechAgent()
    agent.register_agent("Forex AI Trader", "Arbitrage + DCA")
    trade_data = {"pair": "cUSD/cEUR", "amount": 100, "action": "buy"}
    result = agent.execute_trade(trade_data)
    print(result)
