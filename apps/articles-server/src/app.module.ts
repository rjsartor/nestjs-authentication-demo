import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitedLinksModule } from './visted-links/visited-links.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.db',
      autoLoadModels: true,
      synchronize: true,
    }),
    ArticlesModule,
    AuthModule,
    
    VisitedLinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}