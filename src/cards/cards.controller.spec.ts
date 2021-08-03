import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { Card } from "./entities/card.entity";

describe("CardsController", () => {
  let controller: CardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        CardsService,
        { provide: getRepositoryToken(Card), useValue: {} },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
