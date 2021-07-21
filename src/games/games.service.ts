import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CardsService } from "../cards/cards.service";
import { Game } from "./entities/game.entity";
import { GameStack } from "./entities/stack.entity";

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
    @InjectRepository(GameStack)
    private readonly stackRepo: Repository<GameStack>,
    private readonly cardsService: CardsService,
  ) {}

  async create() {
    const game = await this.gameRepo.save(new Game());
    await this.stackRepo.save([
      {
        game,
        order: 0,
        cards: await this.cardsService.findAll(),
      },
      {
        game,
        order: 1,
      },
    ]);
    return this.gameRepo.findOne(game.id);
  }

  async addStack(id: number) {
    const game = await this.gameRepo.findOne(id);
    const maxOrder = game.stacks.reduce(
      (max, stack) => Math.max(max, stack.order),
      0,
    );
    await this.stackRepo.save([
      {
        game,
        order: maxOrder + 1,
      },
    ]);
    return this.gameRepo.findOne(game.id);
  }

  async burnPropagation(gameId: number, cardId: number) {
    const game = await this.gameRepo.findOne(gameId);
    const stack = game.stacks.find((stack) =>
      stack.cards.find((card) => card.id === cardId),
    );
    stack.cards = stack.cards.filter((c) => c.id !== cardId);
    await this.stackRepo.save(stack);
    return this.gameRepo.findOne(gameId);
  }

  async drawPropagation(gameId: number, cardId: number) {
    const game = await this.gameRepo.findOne(gameId);
    const discardStack = game.stacks[0];
    const drawStack = game.stacks.find((stack) =>
      stack.cards.find((card) => card.id === cardId),
    );

    const card = drawStack.cards.find((card) => card.id === cardId);
    drawStack.cards = drawStack.cards.filter((c) => c.id !== cardId);
    discardStack.cards = [...discardStack.cards, card];
    await this.stackRepo.save([drawStack, discardStack]);
    return this.gameRepo.findOne(gameId);
  }

  findAll() {
    return this.gameRepo.find();
  }

  findOne(id: number) {
    return this.gameRepo.findOneOrFail(id);
  }

  findLatest() {
    return this.gameRepo.findOne({ order: { creationDate: "DESC" } });
  }

  remove(id: number) {
    return this.gameRepo.delete(id);
  }
}
