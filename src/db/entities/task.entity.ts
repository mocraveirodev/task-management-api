import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  status: string;

  @Column('timestamptz', { name: 'expiration_date' })
  expirationDate: Date;
}
