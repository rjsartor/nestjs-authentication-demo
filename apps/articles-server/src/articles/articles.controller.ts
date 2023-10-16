import { Controller, Get, Logger, Param, Req, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.interface';
import { visitedLinksStore } from '../store/store';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get('titles')
  getAllTitles(): Partial<Article>[] {
    return this.articlesService.getAllTitles();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneById(@Param('id') id: string, @Req() req: Request): Article {
    const { user } = req as any;
    const userId = user?.id;
    const article = this.articlesService.findById(id);

    if (id && userId) {
      if (!visitedLinksStore[userId]) {
        visitedLinksStore[userId] = [id];
      } else {
        visitedLinksStore[userId].push(id);
      }
    }

    this.logVisitedLinks();

    return article;
  }

  private logVisitedLinks() {
    Logger.log(visitedLinksStore, 'Visited Links: ');
  }
}
