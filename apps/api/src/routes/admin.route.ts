import { Router } from "express";
import {
  validateAdminLogin,
  validateAdminUpdate,
  validateIdParam,
} from "../middleware";
import { login, updateProfile, deleteAdmin } from "../controller";

const router = Router();

router.route("/login").post(validateAdminLogin, login);
router
  .route("/:id")
  .put(validateIdParam, validateAdminUpdate, updateProfile)
  .delete(validateIdParam, deleteAdmin);

export default router;
