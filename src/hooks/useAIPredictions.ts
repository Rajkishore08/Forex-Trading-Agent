import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

export const useAIPredictions = (historicalPrices: number[]) => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const predictPrice = async () => {
      if (historicalPrices.length < 10) return;

      setIsLoading(true);
      try {
        // Create a simple LSTM model
        const model = tf.sequential();
        model.add(tf.layers.lstm({
          units: 50,
          returnSequences: true,
          inputShape: [10, 1]
        }));
        model.add(tf.layers.lstm({ units: 50 }));
        model.add(tf.layers.dense({ units: 1 }));

        model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

        // Prepare data
        const data = historicalPrices.slice(-10);
        const tensorData = tf.tensor2d(data, [1, 10, 1]);

        // Make prediction
        const result = model.predict(tensorData) as tf.Tensor;
        const predictedValue = await result.data();
        setPrediction(predictedValue[0]);

        // Cleanup
        tensorData.dispose();
        result.dispose();
        model.dispose();
      } catch (error) {
        console.error('Error making prediction:', error);
      }
      setIsLoading(false);
    };

    predictPrice();
  }, [historicalPrices]);

  return { prediction, isLoading };
};