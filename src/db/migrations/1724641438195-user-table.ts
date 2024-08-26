import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1724641438195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(256) NOT NULL UNIQUE,
      password_hash VARCHAR(256) NOT NULL
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user;`);
  }
}
