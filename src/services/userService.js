import { getInfo, logout, login } from "../api/UserApi";

class UserService {
  user = {};
  //   user: defaultUser;

  // constructor() {
  //   const user = this._get_data();
  //   // console.log("localStorage", localStorage.getItem("user"));
  //   console.log("userService constructor", user);
  //   if (user) {
  //     this.user = user;
  //   }
  // }

  async login(username, password) {
    login(username, password)
      .then((response) => {
        console.log("登录成功");
        // this._get_data();

        return true;
      })
      .catch((error) => {
        console.error("Login error:", error);
        throw error;
      });
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    if (this.user.userId) {
      return this.user;
    } else {
      this._get_data();

      return this.user;
    }
  }

  logout() {
    logout().then(() => {
      this._clear_data();
    });
  }

  _set_data(user) {
    if (!user) {
      localStorage.setItem("user ", JSON.stringify(user));
    }
  }

  _get_data() {
    getInfo().then((response) => {
      console.log("getInfo response", response);
      if (response.data) {
        this.setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("this.user", this.user);
      } else {
        console.error("Error fetching user info");
        this._clear_data();
        throw new Error("Error fetching user info");
      }
    });
  }

  _clear_data() {
    this.user = {};
    localStorage.removeItem("user");
  }
}

const userService = new UserService();

export default userService;
