import { OmitType } from "@nestjs/mapped-types";
import { Card } from "../entities/card.entity";

export class CreateCardDto extends OmitType(Card, ["id"]) {}
