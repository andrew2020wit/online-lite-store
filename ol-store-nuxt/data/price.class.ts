export class PriceItem {
  price?: number;
  maxCount?: number;
  id: string;
  name?: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class GoodsExt {
  id?: string;
  isActive?: boolean;
  name?: string;
  priority?: number;
  price?: number;
  maxCount?: number;
}
