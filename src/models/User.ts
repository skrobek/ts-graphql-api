import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';

const bcrypt = require('bcrypt');

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    firstName: string;

    @Field(() => String)
    @Column()
    lastName: string;

    @Field(() => Boolean)
    @Column({ default: true })
    isActive: boolean;

    @Field(() => String)
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Field(() => String)
    @Column()
    password: string;

    public isValidPassword = async (password: string) => {
    const user: User = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
    }
}
