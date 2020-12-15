import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../models/User";

const bcrypt = require('bcrypt');

export class UserEmailPasswordNotNull1607774294003 implements MigrationInterface {
    name = 'UserEmailPasswordNotNull1607774294003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users = await queryRunner.manager.find(User);

        const updatedUsers = users.map((user) => {
            const salt = bcrypt.genSaltSync(user.id);
            const hash = bcrypt.hashSync('test', salt);

            user.email = `pskrobek+${user.id}@gmail.com`;
            user.password = hash;
            return user;
        });

        await queryRunner.manager.save(updatedUsers);

        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);


        const users = await queryRunner.manager.find(User);

        const updatedUsers = users.map((user) => {
            user.email = '';
            user.password = '';
            return user;
        });

        await queryRunner.manager.save(updatedUsers);
    }

}
