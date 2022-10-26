import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameSer: GameService) {}

  @Post('newGame')
  newGame(@Body() body: { gameId: number }, @Req() req: Request) {
    return this.gameSer.createNewGame({
      combo: 0,
      points: 0,
      userId: req.user['id'],
      gameId: body.gameId,
    });
  }

  @Post('resumeGame:id')
  resume(@Param() id: number) {
    return this.gameSer.resumeGame(id);
  }

  @Get()
  getGames(@Body() body: { gameid: number }, @Req() req: Request) {
    return this.gameSer.getGame(body.gameid, req.user['id']);
  }
}
