import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  admin = 'admin',
  manager = 'manager',
  user = 'user',
}

export enum UserGender {
  man = 'man',
  woman = 'woman',
  notIndicated = '',
}

export class UserProfile {
  id: string;
  login: string;
  fullName: string;
  role: string;
  defaultDeliverAddress: string;
  phone: string;
  email: string;
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Length(3, 32)
  login?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Length(3, 64)
  fullName?: string;

  @Column({
    nullable: false,
    select: false,
  })
  @Length(2, 32)
  password?: string;

  @Column({ nullable: false, default: 'user' })
  role?: UserRole;

  @Column({ nullable: true, default: '' })
  defaultDeliverAddress?: string;

  @Column({ nullable: true, default: '' })
  email?: string;

  @Column({ nullable: true, default: '' })
  phone?: string;

  @Column({ nullable: true, default: '' })
  gender?: UserGender;

  @Column({ nullable: true, default: '' })
  language?: string;

  @Column({ nullable: true, default: null })
  birthday?: Date;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive?: boolean;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;
}
