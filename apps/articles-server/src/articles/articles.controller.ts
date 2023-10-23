import { VisitedLinksService } from './../visted-links/visited-links.service';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService,
    private visitedLinksService: VisitedLinksService
  ) {}

  @Get('titles')
  async getAllTitles(): Promise<Partial<Article>[]> {
    return await this.articlesService.getAllTitles();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param('id') id: string, @Req() req: Request): Promise<Article> {
    const { user } = req as any;
    const userId = user?.id;
    const article = await this.articlesService.findById(id);

    if (article) {
      await this.visitedLinksService.create(`/article/${id}`, userId)
      return article
    }

    return null;
  }
}
