import { Injectable } from "@nestjs/common";
import { Article } from "./articles.interface";

const createArticle = (id: string, title: string, author: string): Article => {
  return {
    id,
    title,
    author,
    content: 'Lorem ipsum dolor sit amet, consectetur adip...'
  }
} 

const inMemoryArticles = [
  createArticle('1', 'Article 1', 'Author 1'),
  createArticle('2', 'Article 2', 'Author 2'),
  createArticle('3', 'Article 3', 'Author 3'),
  createArticle('4', 'Article 4', 'Author 4'),
]

@Injectable()
export class ArticlesService {
  private readonly articles: Article[] = inMemoryArticles;

  async getAllTitles(): Promise<Partial<Article>[]> {
    return this.articles.map(article => ({ id: article.id, title: article.title }));
  }

  async findById(id: string): Promise<Article> {
    const [article] = this.articles.filter(a => a.id === id);
    return article;
  }
}