interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  dailyHours: number[];
  target: number;
}

const calculateExercises = ( dailyHours: number[], target: number): Result => {
  const length = dailyHours.length;
  const average = dailyHours.reduce((a, b) => a + b) / length;
  let rating = 1;
  let ratingDescription = "Seems like this was a lazy week! Remember to exercise!";

  if ( average === target) {
    rating = 3;
    ratingDescription = "Awesome! You've met your daily target!";
  } else if ( average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  }

  return {
    periodLength: length,
    trainingDays: dailyHours.filter((day) => day !== 0).length,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyHours = [];

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    if (i !== 2) dailyHours.push(Number(args[i]));
  }
  
  return { dailyHours: dailyHours, target: Number(args[2]) };
};

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  } else {
    console.log('Something went wrong');
  }
}