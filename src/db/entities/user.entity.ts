import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar')
  username: string;

  @Column('varchar', { name: 'password_hash' })
  passwordHash: string;
}
