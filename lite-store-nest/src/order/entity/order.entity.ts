import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
  })
  userId?: string;

  @ManyToOne(type => UserEntity)
  @JoinColumn()
  user?: UserEntity;

  @OneToMany(
    () => OrderItemEntity,
    item => item.order,
    {
      eager: true,
      cascade: true,
      nullable: false,
    },
  )
  items?: OrderItemEntity[];

  @Column({ nullable: true })
  orderSum?: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled?: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isPaid?: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isDispatched?: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isDelivered?: boolean;

  @Column('varchar', {
    length: 128,
    nullable: false,
    default: '',
  })
  status?: string;

  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  deliverAddress: string;

  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  userNote?: string;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;
}
