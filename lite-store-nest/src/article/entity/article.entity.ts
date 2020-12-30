import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ArticleTypes {
  article = 'article',
  news = 'news',
  review = 'review',
}

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 512, nullable: false })
  title?: string;

  @Column('varchar', { length: 128, nullable: true, default: 'article' })
  articleType?: ArticleTypes;

  @Column('varchar', {
    length: 2000,
    nullable: false,
    default: '',
  })
  description?: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  text?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive?: boolean;

  @ManyToOne(() => UserEntity, { eager: true, cascade: false, nullable: false })
  author?: UserEntity;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;
}
