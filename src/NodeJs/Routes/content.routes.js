import { 
    CreateContent,
    getAllContents,
    getContentById,
    getComments,
    addComment,
    updateLike,
    deleteLike,
    deleteComment,
    getLike,
    videoByChannelId,
    user,
    checkUser,
 } from "../Controller/contents.controller.js";

import { verfyToken } from "../Middlewares/verifyToken.js";

export function contentRoutes(app) {
    app.get("/content", verfyToken, getAllContents);
    app.get("/video/:id", getContentById);
    app.get("/videos/:channelId", videoByChannelId);
    app.get("/user/:email", user);
    app.get("/checkuser/:email", checkUser);
    app.get("/comments/:videoId", getComments);
    app.post("/upload/:email", CreateContent);
    app.post("/addcomment/:id", addComment);
    app.get("/like/:videoId/:commentId", getLike);
    app.put("/updatelike/:videoId/:commentId", updateLike);
    app.put("/deletelike/:videoId/:commentId", deleteLike);
    app.delete("/deletecomment/:videoId/:commentId", deleteComment);
}