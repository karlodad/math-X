import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { RTGuard } from 'src/common/guards/RtGuards';
import { PartUser } from './DTO/PartUser';
import { Tokens } from './DTO/tokens';
import { getUser } from './DTO/user.schema';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: Tokens })
  login(@Body() body: PartUser): Promise<Tokens> {
    return this.userService.login(body);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: Tokens })
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
  @ApiResponse({ status: 200, type: Tokens })
  refresh(@Req() req: Request): Promise<Tokens> {
    return this.userService.refresh(req.user['id'], req.user['refreshToken']);
  }

  @Get('getuser')
  @ApiResponse({ status: 200, type: getUser })
  getUser(@Req() req: Request) {
    return req.user;
  }
}
