import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaClient/prisma.service';
import * as bcrypt from 'bcrypt';
import { PartUser } from './DTO/PartUser';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './DTO/tokens';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly JwtServise: JwtService,
  ) {}

  async login(data: PartUser): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { login: data.login },
    });

    if (!user) throw new ForbiddenException('incorrect login');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new ForbiddenException('incorrect password');

    const tokens = await this.createTokens(user.id, user.login);

    this.updateRtToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signUp(data: PartUser): Promise<Tokens> {
    data.password = await this.hashData(data.password);

    const user = await this.prisma.user.create({ data });

    const tokens = await this.createTokens(user.id, user.login);

    this.updateRtToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(id: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: { id, hash: { not: null } },
      data: { hash: null },
    });
    return true;
  }

  async refresh(id: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new ForbiddenException('Access denied!');

    const isMatch = await bcrypt.compare(rt, user.hash);

    if (!isMatch) throw new ForbiddenException('Access denied!');

    const tokens = await this.createTokens(user.id, user.login);

    this.updateRtToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async createTokens(id: string, login: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.JwtServise.signAsync(
        {
          sub: id,
          login,
        },
        {
          secret: process.env.ATSecret,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.JwtServise.signAsync(
        {
          sub: id,
          login,
        },
        {
          secret: process.env.RTSecret,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);
    const datalife = new Date(this.JwtServise.decode(accessToken)['exp']*1000).toJSON();
    return {
      refreshToken,
      accessToken,
      datalife,
    };
  }

  async updateRtToken(id: string, RTtoken: string) {
    const hash = await this.hashData(RTtoken);

    await this.prisma.user.update({ data: { hash }, where: { id } });
  }

  hashData(password: string): Promise<string> {
    return bcrypt.hash(password, +process.env.CRYPT_SALT || 10);
  }
}
