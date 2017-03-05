export interface LightParams {
  radius: number;
  blur: number;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

export interface LightMovement {
  x: number;
  y: number;
  angle: number;
  velocity: number;
}

export class Light implements LightMovement {
  public x: number;
  public y: number;
  public angle: number;
  public velocity: number;

  constructor(
    public radius: number = 50,
    public blur: number = 55,
    public hue: number = 180,
    public saturation: number = 40,
    public lightness: number = 35,
    public alpha: number = 0.3,
  ) {

  }

  public setMovement(movement: LightMovement) {
    this.x = movement.x;
    this.y = movement.y;
    this.angle = movement.angle;
    this.velocity = movement.velocity;
  }

  static White(
    radius: number = 1,
    alpha: number = 0.3,
  ) {
    return new Light(radius, 0, 0, 0, 100, alpha);
  }
}