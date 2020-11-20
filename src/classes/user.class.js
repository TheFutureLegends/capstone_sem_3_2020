import db from "../models/index.js";

class userClasses {
  constructor() {
    // this.user = user;
  }

  get user() {
    return this._user;
  }

  set userAPI(user) {
    this._user = user;
  }

  getUser() {
    var authorities = [];

    for (let i = 0; i < this._user.roles.length; i++) {
      authorities.push(this._user.roles[i].name.toLowerCase());
    }

    return {
      username: this._user.username,
      email: this._user.email,
      avatar: this._user.avatar,
      roles: authorities,
    };
  }
}

export default userClasses;
