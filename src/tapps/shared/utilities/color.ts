export class Color {

  /*
   * Returns a hsla color string based on values.
   * @param hue is the color wheel in the range between 0° and 360°.
   * @param saturation is the color strength between 0% (grayscale) and 100% (full color).
   * @param lightness is the brightness between 0% (black) and 100% (white).
   * @param alpha is the transparency between 0 (transparent) and 1 (opaque).
   */
  static hsla(hue: number, saturation: number, lightness: number, alpha: number) {
    return 'hsla(' + hue + ',' + saturation + '%,' + lightness + '%,' + alpha + ')';
  }
}