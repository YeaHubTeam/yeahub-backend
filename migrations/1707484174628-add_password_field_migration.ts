import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordFieldMigration1707484174628 implements MigrationInterface {
    name = 'AddPasswordFieldMigration1707484174628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
    }

}
