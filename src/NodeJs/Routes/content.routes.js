import { 
    CreateContent,
    getAllContents,
    getContentById,
    addComment
 } from "../Controller/contents.controller.js";

import { verfyToken } from "../Middlewares/verifyToken.js";

export function contentRoutes(app) {
    app.get("/content", verfyToken, getAllContents);
    app.get("/video/:id", getContentById);
    app.post("/upload", CreateContent);
    app.post("/addcomment/:id", addComment);
}