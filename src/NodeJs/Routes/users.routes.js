import { register, login } from "../Controller/users.controller.js";

export function userRoutes(app) {
    app.post("/register", register);
    app.post("/login", login);
}