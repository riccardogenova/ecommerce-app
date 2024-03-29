import { Cart, Category, Order, Product, Table, User, UserLogged } from './declarations';
import { v4 as uuidv4 } from 'uuid';

export class AmazonApp {
  name: string = 'Amazon App';
  // USERS
  #users: Table<User> = {};
  #userLogged: UserLogged = null;
  // ORDERS
  #orders: Table<Order> = {};
  #userOrders: Table<Array<Order['id']>> = {};
  #orderUser: Table<User['id']> = {};
  #orderProducts: Table<Array<Product['id']>> = {};
  // CATEGORIES
  #categories: Table<Category> = {};
  // PRODUCTS
  #products: Table<Product> = {};
  #productSeller: Table<User['id']> = {};
  #productCategory: Table<Category['id']> = {};
  #userProducts: Table<Array<Product['id']>> = {};
  // CART
  #carts: Table<Cart> = {};
  #userCart: Table<Cart['id']> = {};
  #cartUser: Table<User['id']> = {};
  #cartProducts: Table<Array<{ idProduct: Product['id']; date: Date }>> = {};
  // #endregion

  // #region METHODS
  login() {}
  logout() {}
  signup() {}
  deleteUser() {}
  getUserLogged() {}
  upgradeUserToSeller() {}

  addProductToStore() {}
  removeProductFromStore() {}
  getProducts() {}
  addProductToCart() {}
  removeProductFromCart() {}

  createCategory(name: Category['name']) {
    const categoryList = this.getCategoryList();
    const categoryFound = categoryList.find(category => category.name === name);
    if (!!categoryFound) throw new Error('Category already exists');

    const id = uuidv4();
    const newCategory = { id, name };
    this.#categories[id] = newCategory;
    this.#saveCategoriesToCache();
    return newCategory;
  }

  #saveCategoriesToCache() {
    localStorage.setItem('categories', JSON.stringify(this.#getCategories()));
  }

  #getCategories() {
    return this.#categories;
  }

  getCategoryList() {
    const fileredCategories = Object.values(this.#getCategories()).filter(category => !category.deleted);
    return fileredCategories;
  }

  getCategory(id: Category['id']) {
    const categories = this.#getCategories();
    if (!categories[id] || categories[id].deleted) throw new Error('Category not found');
    return categories[id];
  }

  removeCategory(id: Category['id']) {
    const categories = this.#getCategories();
    if (!categories[id] || categories[id].deleted) throw new Error('Category not found');
    categories[id].deleted = true;
    this.#saveCategoriesToCache();
    return categories[id];
  }

  updateCategory({ id, name }: { id: Category['id']; name: Category['name'] }) {
    const categories = this.#getCategories();
    if (!categories[id] || categories[id].deleted) throw new Error('Category not found');

    categories[id].name = name;
    this.#saveCategoriesToCache();
    return categories[id];
  }

  createOrder(idProducts: Array<Product['id']>) {}

  emptyCart(idCart: Cart['id']) {
    if (this.#userLogged) {
      const cart = this.#carts[idCart];
      if (!cart) throw new Error('Cart not found');
      delete this.#cartProducts[idCart];
      delete this.#carts[idCart];
      delete this.#userCart[this.#userLogged.id];
      delete this.#cartUser[idCart];
    } else throw new Error('User not logged');
  }

  checkout() {
    if (!this.#userLogged) throw new Error('User not logged');
    const idCart = this.#userCart[this.#userLogged.id];
    if (!idCart) throw new Error('Cart not found');
    const products = this.#cartProducts[idCart];
    const idProducts = products.map(product => product.idProduct);
    this.createOrder(idProducts);
    this.emptyCart(idCart);
  }

  getOrders() {}
  deleteOrder() {}
  removeProductFromOrder() {}
  // #endregion
}
