export class OrderItemEntity {
  id?: string;
  order?: OrderEntity;
  goodsId: string;
  count: number;
  isCanceled?: boolean;
  price: number;
  currency?: string;
  createdOn?: Date;
  updatedOn?: Date;
  constructor(goodsId: string, count: number, price: number) {
    this.goodsId = goodsId;
    this.count = count;
    this.price = price;
  }
}

export class OrderEntity {
  id?: string;
  userId?: string;
  items: OrderItemEntity[];
  orderSum?: number;
  isCanceled?: boolean;
  isPaid?: boolean;
  isDispatched?: boolean;
  isDelivered?: boolean;
  status?: string;
  deliverAddress: string;
  userNote: string;
  createdOn?: Date;
  updatedOn?: Date;
  constructor(
    items: OrderItemEntity[],
    deliverAddress: string,
    userNote: string
  ) {
    this.items = items;
    this.deliverAddress = deliverAddress;
    this.userNote = userNote;
  }
}

export class QueryEntityDto {
  maxItemCount?: number;
  createdOnLessThan?: Date;
  pattern?: string;
  entityType?: string;
}
