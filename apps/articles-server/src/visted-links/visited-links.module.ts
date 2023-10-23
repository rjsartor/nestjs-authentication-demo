import { VisitedLinksService } from './visited-links.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitedLink } from './visited-links.model';

@Module({
  imports: [SequelizeModule.forFeature([VisitedLink])],
  providers: [VisitedLinksService],
  exports: [VisitedLinksService],
})
export class VisitedLinksModule {}