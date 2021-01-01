export class CartItem {
  id: string;
  name: string;
  price: number;
  count: number;
  created: Date;
  update: Date;
  constructor(id: string, name: string, count: number, price: number) {
    this.id = id;
    this.name = name;
    this.count = count;
    this.price = price;
    this.update = this.created = new Date();
  }
}

interface State {
  cartItems: any;
}

export const state = function (): State {
  return {
    cartItems: {},
  };
};

export const mutations = {
  setCartItem(state: State, item: CartItem) {
    const newCartItems = state.cartItems;
    if (item.count == 0) {
      delete newCartItems[item.id];
    } else {
      newCartItems[item.id] = item;
    }
    state.cartItems = newCartItems;
  },
};

export const getters = {};
