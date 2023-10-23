import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class VisitedLink extends Model {
  @Column
  url: string;

  @Column
  userId: string;

  @Column
  visitedAt: Date;
}