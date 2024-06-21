import { logout } from "../api/VideoApi";
import { getInfo } from "../api/UserApi";

class UserService {
  user = {};
  //   user: defaultUser;

  constructor() {
    const user = this._get_data();
    // console.log("localStorage", localStorage.getItem("user"));
    console.log("userService constructor", user);
    if (user) {
      this.user = user;
    }
  }

  setUser(user) {
    this.user = user;
    this._set_data(user);
  }

  getUser() {
    return this.user;
  }

  logout() {
    logout().then(() => {
      this._clear_data();
    });
  }

  _set_data(user) {
    localStorage.setItem("user ", JSON.stringify(user));
  }

  _get_data() {
    // const user = localStorage.getItem("user");
    // console.log("userService _get_data", user);

    // if (user) {
    //   try {
    //     const parsedUser = JSON.parse(user);
    //     console.log("userService _get_data true", parsedUser);
    //     return parsedUser;
    //   } catch (e) {
    //     console.error("JSON parse error:", e);
    //     return null;
    //   }
    // } else {
    //   console.log("userService _get_data false");
    //   return null;
    // }

    getInfo().then((response) => {
      console.log("getInfo response", response);
      if (response.data) {
        this.setUser(response.data);
      } else {
        console.error("Error fetching user info");
        this._clear_data();
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
