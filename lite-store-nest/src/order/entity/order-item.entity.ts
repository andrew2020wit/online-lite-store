import { GoodsEntity } from 'src/goods/entity/goods.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => OrderEntity, { onDelete: 'CASCADE' })
  order?: OrderEntity;

  @Column({
    nullable: false,
  })
  goodsId?: string;

  @ManyToOne(type => GoodsEntity, {
    eager: true,
    cascade: false,
    nullable: false,
  })
  @JoinColumn()
  goods?: GoodsEntity;

  @Column({ nullable: true, default: 1 })
  count: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled?: boolean;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: '' })
  currency?: string;

  @CreateDateColumn()
  createdOn?: Date;

  s;
  @UpdateDateColumn()
  updatedOn?: Date;
}
