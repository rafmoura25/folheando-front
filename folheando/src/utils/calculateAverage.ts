export function calculateAverage(ratings: number[]) {
  if (ratings.length === 0) return 0
  const total = ratings.reduce((acc, value) => acc + value, 0)
  return Number((total / ratings.length).toFixed(1))
}