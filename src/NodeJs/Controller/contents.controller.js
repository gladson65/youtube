import mongoose from "mongoose";
import contentModel from "../Model/contents.model.js";






// getting all contents
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


// getting content by videoId
export function getContentById(req, res) {

    const videoId = req.params.id;

    contentModel.findOne({videoId: `${videoId}`}).then((data) => {

        if (!data) {
            return res.status(404).json({message: "Sorry No Data Found"});
        }

        return res.status(200).json({message: "Data Found", data});
    
    }).catch((error) => {
        return res.status(500).json({message: error.message})
    })
}




// uploading video
export function CreateContent(req, res) {

    const { videoId, title, thumbnailUrl, videoUrl, description, channelId, channelPic, uploader, views, likes, dislikes, comments } = 
        req.body;

    
    if (!title || title.length == 0 ) {
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
        videoUrl, 
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


// add a comment
export function addComment(req, res) {

    const videoId = req.params.id;
    const { text } = req.body;


    if (!text) {
        return res.json({message: "Key Should be 'text' "});
    }

    let randomId = Math.floor(Math.random() * 100);
    const newComment = {commentId:`0${randomId}`, text, timestamp:`${new Date()}`}

    contentModel.findOneAndUpdate({videoId}, { $push: { comments: newComment  } }).then((data) => {

        if (!data) {
            return res.status(400).json({message: `No such data with id: "${videoId}" to update comments`})
        }

        return res.status(201).json({message: "Comments successfully updated", update: req.body })
    
    
    }).catch((error) => {
        return res.status(500).json({message: error.message});
    })


}