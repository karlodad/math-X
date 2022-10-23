import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { RTGuard } from 'src/common/guards/RtGuards';
import { PartUser } from './DTO/PartUser';
import { Tokens } from './DTO/tokens';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: PartUser): Promise<Tokens> {
    return this.userService.login(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUP(@Body() body: PartUser): Promise<Tokens> {
    return this.userService.signUp(body);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    return this.userService.logout(req.user['id']);
  }

  @Public()
  @UseGuards(RTGuard)
  @Post('refresh')
  refresh(@Req() req: Request): Promise<Tokens> {
    return this.userService.refresh(req.user['id'], req.user['refreshToken']);
  }
}
