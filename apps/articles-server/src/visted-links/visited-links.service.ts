
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VisitedLink } from './visited-links.model';

@Injectable()
export class VisitedLinksService {
  constructor(
    @InjectModel(VisitedLink) private visitedLink: typeof VisitedLink,
  ) {}

  create(url: string, userId: string): Promise<VisitedLink> {
    return this.visitedLink.create({
      url,
      userId,
      visitedAt: new Date(),
    })
  }
}