const axios = require("axios");

async function getMarkets() {
    const response = await axios.get("https://api.omen.eth.link/prediction-markets");
    console.log("Available Prediction Markets:", response.data);
    return response.data;
}

getMarkets();
