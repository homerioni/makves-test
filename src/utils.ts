export const getMinMaxOffsetPosition = (data: number[]) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;

  const differencesSum = data
    .map((value) => Math.pow(value - mean, 2))
    .reduce((sum, value) => sum + value, 0);

  const standardDeviation = Math.sqrt(differencesSum / data.length);

  return {
    min: 1 - (mean - standardDeviation - min) / (max - min),
    max: 1 - (mean + standardDeviation - min) / (max - min),
    minValue: mean - standardDeviation,
    maxValue: mean + standardDeviation,
  };
};