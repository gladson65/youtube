import mongoose from "mongoose";
import contentModel from "../Model/contents.model.js";







export function getAllContents(req, res) {

    contentModel.find({}).then((data) => {

        if (!data) {
            return res.status(404).json({message: "No data found"})
        }

        return res.status(200).json(data);
    
    }).catch((error) => {
        return res.status(500).json({message: error.message})
    }) 
}








export function CreateContent(req, res) {

    const { videoId, title, thumbnailUrl, description, channelId, channelPic, uploader, views, likes, dislikes, comments} = 
        req.body;

    
    if(!title || title.length == 0 ) {
        return res.status(400).json({message: "You should provide a title"});
    }
    if (!videoId || videoId.length == 0) {
        return res.status(400).json({message: "please provide video Id"});
    }
    if (!thumbnailUrl || thumbnailUrl.url == 0) {
        return res.status(400).json({message: "please provide a thumbnail"});
    }

    const newVideo = contentModel({
        videoId, 
        title, 
        thumbnailUrl, 
        description, 
        channelId, 
        channelPic, 
        uploader, 
        views, 
        likes, 
        dislikes, 
        comments
    })

    newVideo.save().then((data) => {
        if (!data) {
            return res.status(400).json({message: "Something went wrong try again later"})
        }

        return res.status(201).json({message: "Content Successfully Created", data})
    
    })

}

