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
  cartItems: Record<string, any>;
  cartIsOpen: boolean;
  sum: number;
  items: number;
}

export const state = function (): State {
  return {
    cartItems: {},
    cartIsOpen: false,
    sum: 0,
    items: 0,
  };
};

export const mutations = {
  setCartItem(state: State, item: CartItem) {
    const cartItems1 = state.cartItems;

    let sum = 0;
    let items = 0;

    delete cartItems1[item.id];

    if (item.count > 0) {
      cartItems1[item.id] = item;
    }

    for (let key in cartItems1) {
      items += 1;

      sum += cartItems1[key].count * cartItems1[key].price;
    }
    state.items = items;
    state.sum = sum;

    const cartItems2 = {};

    Object.assign(cartItems2, cartItems1);
    state.cartItems = cartItems2;
  },

  showCart(state: State) {
    state.cartIsOpen = true;
    console.log('  state.cartIsOpen', state.cartIsOpen);
  },
  hideCart(state: State) {
    state.cartIsOpen = false;
  },
  clearCart(state: State) {
    state.cartItems = {};
    state.items = 0;
    state.sum = 0;
  },
};

export const getters = {};
