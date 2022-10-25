import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaClient/prisma.service';
import { NewGame } from './DTO/newgame.schema';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewGame(data: NewGame) {
    const gane = await this.prisma.score.create({ data });
    return gane.id;
  }

  async resumeGame(id: number) {
    const game = this.prisma.score.findUnique({ where: { id } });
    return game;
  }
}
