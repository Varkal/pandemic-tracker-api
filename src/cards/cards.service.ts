import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Card } from "./entities/card.entity";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private readonly cardRepo: Repository<Card>,
  ) {}

  create(createCardDto: CreateCardDto) {
    return this.cardRepo.save({
      name: createCardDto.name,
      continent: createCardDto.continent,
      faction: createCardDto.faction,
      sideEffect: createCardDto.sideEffect,
    });
  }

  findAll() {
    return this.cardRepo.find({ order: { name: "ASC" } });
  }

  findOne(id: number) {
    return this.cardRepo.findOneOrFail(id);
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.cardRepo.findOneOrFail(id);
    return this.cardRepo.save(Object.assign(card, updateCardDto));
  }

  async remove(id: number) {
    await this.cardRepo.delete(id);
  }
}
