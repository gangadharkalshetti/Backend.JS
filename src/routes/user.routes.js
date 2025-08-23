import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1

        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser
)



export default router
// import express from "express";
// import { upload } from "../middlewares/multer.middlewares.js";
// import { registerUser } from "../controllers/user.controllers.js";

// const router = express.Router();

// router.post(
//   "/register",
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 }
//   ]),
//   registerUser
// );

// export default router;
