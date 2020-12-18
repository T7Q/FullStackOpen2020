interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = ( dailyHours: number[], target: number): Result => {
  const length = dailyHours.length
  const average = dailyHours.reduce((a, b) => a + b) / length
  let rating = 1
  let ratingDescription = "Seems like this was a lazy week! Remember to exercise!"

  if ( average === target) {
    rating = 3
    ratingDescription = "Awesome! You've met your daily target!"
  } else if ( average >= target * 0.5) {
    rating = 2
    ratingDescription = 'Not too bad but could be better'
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));