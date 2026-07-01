import { Router } from "express";
import { login } from "./controllers/authController.js";
import { criarProjeto } from "./controllers/projectController.js";
import { auth } from "./middleware/auth.js";

const routes = Router();

routes.post("/login", login);

routes.post("/projetos", auth, criarProjeto);

export default routes;