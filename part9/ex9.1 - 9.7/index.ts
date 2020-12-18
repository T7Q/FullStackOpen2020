import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './calculateExercises';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(heightNumber, weightNumber);

  return res.json({ weightNumber, heightNumber, bmi });

});

app.post("/exercises", (req, res) => {
  const { dailyHours, target } = req.body as {
    dailyHours: number[];
    target: number;
  };

  if (!dailyHours || !target || dailyHours.length === 0) {
    return res.status(400).json({ error: "parameters missing" });
  } else if (isNaN(target) || dailyHours.filter((num : number) => isNaN(num)).length > 0) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  
  return res.json(calculateExercises(dailyHours, target)); 
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});