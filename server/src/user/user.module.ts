import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ATStrategy } from './strategies/at.strata';
import { RTStrategy } from './strategies/rt.strats';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, PrismaService, RTStrategy, ATStrategy],
})
export class UserModule {}
