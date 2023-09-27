const state = {
  cartItems: [], // Almacena los productos en el carrito
  cartMenu: false, // Estado del menú del carrito
  InCart: false,
};

const mutations = {
  ADD_TO_CART(state, product) {
    const existingProduct = state.cartItems.find(
      (item) => item.product._id === product._id,
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      state.cartItems.push({ product, quantity: 1 });
    }
  },
  REMOVE_FROM_CART(state, product) {
    const index = state.cartItems.findIndex(
      (item) => item.product._id === product._id,
    );
    if (index !== -1) {
      state.cartItems.splice(index, 1); // Elimina todo el producto del carrito
    }
  },
  CLEAR_CART(state) {
    state.cartItems = [];
  },
  UPDATE_CART_ITEM(state, payload) {
    const { product, quantity } = payload;
    const existingProduct = state.cartItems.find(
      (item) => item.product._id === product._id,
    );
    if (existingProduct) {
      existingProduct.quantity = quantity;
    }
  },
  CART_MENU_TOGGLE(state) {
    state.cartMenu = !state.cartMenu;
  },
  IN_CART(state, payload) {
    state.InCart = payload;
  },
};

const actions = {
  addToCart({ commit }, product) {
    product.quantity = 1;
    commit('ADD_TO_CART', product);
  },
  removeFromCart({ commit }, product) {
    commit('REMOVE_FROM_CART', product);
  },
  clearCart({ commit }) {
    commit('CLEAR_CART');
  },
  updateCartItem({ commit }, payload) {
    console.log('updateCartItem');
    commit('UPDATE_CART_ITEM', payload);
  },
  cartMenuToggle({ commit }) {
    console.log('cartMenuToggle');
    commit('CART_MENU_TOGGLE');
  },
  countProduct({ commit }, payload) {
    commit('COUNT_PRODUCT', payload);
  },
  inCart({ commit }, payload) {
    commit('IN_CART', payload);
  },
  add({ commit, state }, productId) {
    const existingProduct = state.cartItems.find(
      (item) => item.product._id === productId,
    );

    console.log(existingProduct);

    if (existingProduct) {
      // If the product already exists in the cart, increment its quantity by 1
      commit('UPDATE_CART_ITEM', {
        product: existingProduct.product,
        quantity: existingProduct.quantity + 1,
      });
    } else {
      // If the product does not exist in the cart, add it with a quantity of 1
      const productToAdd = state.products.find(
        (product) => product._id === productId,
      );

      if (productToAdd) {
        commit('ADD_TO_CART', productToAdd);
      }
    }
  },
  subtract({ commit, state }, productId) {
    const existingProduct = state.cartItems.find(
      (item) => item.product._id === productId,
    );

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        // If the product quantity is greater than 1, decrement it by 1
        commit('UPDATE_CART_ITEM', {
          product: existingProduct.product,
          quantity: existingProduct.quantity - 1,
        });
      } else {
        // If the product quantity is 1, remove it from the cart
        commit('REMOVE_FROM_CART', existingProduct.product);
      }
    }
  },
};

const getters = {
  cartItems: (state) => state.cartItems,
  cartMenu: (state) => state.cartMenu,
  cartCount: (state) => state.cartItems.length,
  isInCart: (state) => (productId) =>
    //devolver true si el producto está en el carrito
    state.cartItems.some((item) => item.product._id === productId),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
