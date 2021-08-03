import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CardsService } from "../cards/cards.service";
import { Game } from "./entities/game.entity";
import { GameStack } from "./entities/stack.entity";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";

describe("GamesController", () => {
  let controller: GamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        GamesService,
        { provide: getRepositoryToken(Game), useValue: {} },
        { provide: getRepositoryToken(GameStack), useValue: {} },
        { provide: CardsService, useValue: {} },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
