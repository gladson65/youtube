import { 
    CreateContent,
    getAllContents
 } from "../Controller/contents.controller.js";

import { verfyToken } from "../Middlewares/verifyToken.js";

export function contentRoutes(app) {
    app.get("/content", verfyToken, getAllContents);
    app.post("/upload", CreateContent);
}