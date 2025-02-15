from gnosis.safe import Safe
import requests

class SafeTradeExecution:
    def __init__(self, safe_address, owner_key):
        self.safe = Safe(safe_address, owner_key)
        self.api_url = "https://api.safe.global/tx-service/"

    def execute_trade(self, trade_data):
        tx_payload = {
            "to": trade_data["to"],
            "value": trade_data["amount"],
            "data": trade_data["data"],
            "safeTxGas": 200000,
        }
        response = requests.post(f"{self.api_url}/propose-tx", json=tx_payload)
        return response.json()

# Example Usage
if __name__ == "__main__":
    safe_exec = SafeTradeExecution("0xSAFE_ADDRESS", "PRIVATE_KEY")
    trade = {"to": "0xExchangeAddress", "amount": 100, "data": ""}
    safe_exec.execute_trade(trade)
