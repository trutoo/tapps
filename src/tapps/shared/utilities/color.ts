export class Color {

  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public a: number = 1,
  ) {

  }

  //------------------------------------------------------------------------------------
  // MANIPULATIONS
  //------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------
  // FROM INPUTS
  //------------------------------------------------------------------------------------

  /**
   * Returns a new {Color} from and hex color.
   * @param alphaHexColor is the hex color string in the format of #RRGGBB.
   */
  static FromHex(hexColor: string): Color {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1) : null;
  }

  /**
   * Returns a new {Color} from and alpha hex color.
   * @param alphaHexColor is the alpha hex color string in the format of #AARRGGBB.
   */
  static FromAlphaHex(alphaHexColor: string): Color {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(alphaHexColor);
    return result ? new Color(parseInt(result[2], 16), parseInt(result[3], 16), parseInt(result[4], 16), parseInt(result[1], 16) / 255) : null;
  }


  //------------------------------------------------------------------------------------
  // TO OUTPUTS
  //------------------------------------------------------------------------------------

  /**
   * Returns a new hsl formatted string.
   */
  public toHSL(): string {
    return 'hsl(' + this.h + ',' + this.s + '%,' + this.l + '%)';
  }

  /**
   * Returns a new hsla formatted string.
   */
  public toHSLA(): string {
    return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
  }

  /**
   * Returns a new hsla formatted string.
   */
  public toRGB(): string {
    return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
  }

  /**
   * Returns a new hsla formatted string.
   */
  public toRGBA(): string {
    return 'rgba(' + this.a + ',' + this.g + ',' + this.b + ',' + this.a + ')';
  }

  //------------------------------------------------------------------------------------
  // GETTERS
  //------------------------------------------------------------------------------------

  public get h(): number {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = (max + min) / 2;

    if (max == min) {
      h = 0; // achromatic
    } else {
      let d = max - min;

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h = Math.floor(h * 60);
    }
    return h;
  }

  public get s(): number {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let s, l = (max + min) / 2;

    if (max == min) {
      s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    }
    return Math.floor(s * 100);
  }

  public get l(): number {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let l = (max + min) / 2;

    return Math.floor(l * 100);
  }

  //------------------------------------------------------------------------------------
  // SETTERS
  //------------------------------------------------------------------------------------
}