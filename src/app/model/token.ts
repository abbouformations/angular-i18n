export class Token {
  constructor(
    public username: string,
    public jwttoken: string,
    public roles: string[]
  ) {}
}
