import { Table, Model, Column } from 'sequelize-typescript';

@Table({ tableName: 'tweets' })
export class Tweet extends Model {
  @Column
  text: string;
}
