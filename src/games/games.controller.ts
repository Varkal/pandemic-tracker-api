import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { GamesService } from "./games.service";

@Controller("games")
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create() {
    return this.gamesService.create();
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Post(":id/stack")
  addStack(@Param("id", new ParseIntPipe()) id: number) {
    return this.gamesService.addStack(id);
  }

  @Post(":gameId/draw-propagation/:cardId")
  drawPropagation(
    @Param("gameId", new ParseIntPipe()) gameId: number,
    @Param("cardId", new ParseIntPipe()) cardId: number,
  ) {
    return this.gamesService.drawPropagation(+gameId, +cardId);
  }

  @Post(":gameId/burn-propagation/:cardId")
  burnPropagation(
    @Param("gameId", new ParseIntPipe()) gameId: number,
    @Param("cardId", new ParseIntPipe()) cardId: number,
  ) {
    return this.gamesService.burnPropagation(+gameId, +cardId);
  }

  @Get("latest")
  findLatest() {
    return this.gamesService.findLatest();
  }

  @Get(":id")
  findOne(@Param("id", new ParseIntPipe()) id: number) {
    return this.gamesService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id", new ParseIntPipe()) id: number) {
    return this.gamesService.remove(+id);
  }
}
