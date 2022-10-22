import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'ATjwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ATSecret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, login: payload.login, exp: payload.exp };
  }
}
