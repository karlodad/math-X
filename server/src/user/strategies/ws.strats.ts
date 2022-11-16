import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly JwtServise: JwtService,
  ) {}
  // constructor(user: UserService) {}
  async canActivate(
    context: any,
  ): Promise<
    boolean | any | Promise<boolean | any> | Observable<boolean | any>
  > {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      await this.JwtServise.verify(bearerToken, {
        secret: process.env.ATSecret,
      });
      return true;
    } catch (ex) {
      return false;
    }
  }
}
