export const PercentileMss = (value: number) => {
  return 100 *
    (1 / (1 + Math.exp(-0.07056 * Math.pow(value, 3) - 1.5976 * value)))
}
