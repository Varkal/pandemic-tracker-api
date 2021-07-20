import { Module } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./entities/game.entity";
import { GameStack } from "./entities/stack.entity";
import { CardsModule } from "../cards/cards.module";

@Module({
  imports: [TypeOrmModule.forFeature([Game, GameStack]), CardsModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
