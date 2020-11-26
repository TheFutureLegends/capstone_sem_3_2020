import authJwt from "./authJwt.js";
import verifySignUp from "./verifySignUp.js";
// import verifySignUp from "./verifySignup.js";
import permission from "./permission.js";
import imageUpload from "./imageUpload.js";

const middleware = {
  authJwt,
  verifySignUp,
  permission,
  imageUpload,
};

export default middleware;
