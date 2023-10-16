import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
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
    const { name } = (req as any).user;
    const article = this.articlesService.findById(id);

    if (id) {
      if (!visitedLinksStore[name]) {
        visitedLinksStore[name] = [];
      }
  
      if (!visitedLinksStore[name].includes(id)) {
        visitedLinksStore[name].push(id);
      }
    }

    console.log('visitedLinks: ', visitedLinksStore);
    return article;
  }
}
