/**
 * Return a parameterized function of a linear combination of Gaussian and Lorentzian shapes (see README for equation).
 * @param {Number} x - center of the lorentzian function.
 * @param {Number} y - height of the lorentzian shape curve.
 * @param {Number} width - full width at half maximum (FWHM) of the lorentzian function.
 * @param {Number} mu - ratio of gaussian contribution.
 * @param {Number} t - x value to calculate.
 */

export function pseudovoigtFct(x, y, width, mu, t) {
  const squareWidth = width * width;
  return (
    y *
    (((1 - mu) * squareWidth) / (4 * Math.pow(t - x, 2) + squareWidth) +
      mu * Math.exp(-4 * Math.LN2 * Math.pow((t - x) / width, 2)))
  );
}
