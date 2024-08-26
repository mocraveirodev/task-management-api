import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTable1724641455206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE TABLE tasks (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      title VARCHAR(255) NOT NULL,
      description VARCHAR(512) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'TO_DO',
      expiration_date TIMESTAMP NOT NULL
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS task;`);
  }
}
