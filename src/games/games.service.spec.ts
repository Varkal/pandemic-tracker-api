import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CardsService } from "../cards/cards.service";
import { Game } from "./entities/game.entity";
import { GameStack } from "./entities/stack.entity";
import { GamesService } from "./games.service";

describe("GamesService", () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: getRepositoryToken(Game), useValue: {} },
        { provide: getRepositoryToken(GameStack), useValue: {} },
        { provide: CardsService, useValue: {} },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
