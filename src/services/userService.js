class UserService {
  userList = [];
  currentUser = null;

  constructor() {
    this._loadData();
    // console.log("UserService constructor", this.currentUser);
  }

  logging(username, password) {
    // 比较用户名和密码，如果正确则返回用户信息，否则返回null
    const user = this.userList.find(
      (u) => u.name === username && u.password === password
    );
    if (user) {
      this.currentUser = user;
      console.log("UserService logging: currentUser", this.currentUser);
      this._setData();
    }
    return !!user;
  }

  logout() {
    console.log("UserService logout: currentUser", this.currentUser);
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }

  getUser() {
    console.log("UserService getUser: currentUser", this.currentUser);
    return this.currentUser;
  }
  getCart() {
    // 如果当前用户存在，则返回其购物车，否则返回空数组
    return this.currentUser ? this.currentUser.cart : [];
  }

  // 在购物车中添加商品
  addCart(product) {
    const existingProduct = this.currentUser.cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.currentUser.cart.push({ ...product, quantity: 1 });
    }
    this._setData();
  }

  deleteCart(goods) {
    this.currentUser.cart = this.currentUser.cart.filter(
      (item) => !goods.some((good) => good.id === item.id)
    );
    this._setData();
  }

  /**
   * 传入的cart会完全覆盖原来的cart
   * @param {*} cart
   */
  setCart(cart) {
    this.currentUser.cart = cart;
    this._setData();
  }

  _setData() {
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  }

  _loadData() {
    const user = localStorage.getItem("currentUser");
    this.userList = JSON.parse(localStorage.getItem("userList")) || [];
    if (user) {
      this.currentUser = JSON.parse(user);
    } else {
      console.log("no login");
    }
  }
}

const userService = new UserService();
export default userService;
