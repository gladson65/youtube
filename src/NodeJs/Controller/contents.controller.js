import mongoose from "mongoose";
import contentModel from "../Model/contents.model.js";
import userModel from "../Model/users.model.js";
import channelModel from "../Model/channel.model.js";






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


// getting user
export function user(req, res) {

    const email = req.params.email;


    channelModel.findOne({email: email}).then((channeldata) => {

        if (!channeldata) {
            return res.status(404).json({message: "User don't have any channel", key:"channelError"})
        }

        else {

            userModel.find({email: email}).then((data) => {

                if (!data) {
                    return res.status(404).json({message: "No Data Found"})
                }
        
                return res.status(200).json({data: data, channeldata: channeldata});
                
            }).catch((error) => {
                return res.status(500).json({message: error.message});
            })

        }
    
    }).catch((error) => {
        return res.status(500).json({message: error.message})
    })

    
}


//check user
export function checkUser(req, res) {

    const email = req.params.email;

    channelModel.findOne({email: email}).then((data) => {

        if (!data) {
            return res.status(404).json({message: "No Channel", key: "channelError"});
        }

        return res.status(200).json(data);
    
    }).catch((error) => {
        return res.status(500).json({message: error.message})
    })
} 



// getting content by channelId
export function videoByChannelId(req, res) {

    const channelId = req.params.channelId;

    contentModel.find({channelId: channelId}).then((data) => {

        if (!data) {
            return res.status(404).json({message: "No Data Found"})
        }

        return res.status(200).json(data);
    
    }).catch((error) => {
        return res.status(500).json({message: error.message});
    })
}




// uploading video
export function CreateContent(req, res) {

    
    let channelId;
    const email = req.params.email;

    // random video ID
    let random = Math.random()*100;
    let videoId = `video_0${random}`;

    const { title, thumbnailUrl, videoUrl, description, channelPic, subscriber, uploader, views, likes, dislikes, comments } = 
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

    userModel.find({'email': email}).then((data) => {

        if (!data) {
            return res.status(400).json({message: "No User Registered"});
        }
        

        channelId = data[0].channelId;


        channelModel.findOne({email: email}).then((data) => {

            if (!data) {
                return res.status(404).json({message: `No Channel with this email: ${email}. Create a channel with this email then upload`, key: "channelError"});
            }

            else {
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
                    subscriber, 
                    email,
                    comments
                })
            
                newVideo.save().then((data) => {
                    
                    if (!data) {
                        return res.status(400).json({message: "Something went wrong try again later"})
                    }
            
                    return res.status(201).json({message: "Content Successfully Created", data})
                
                })
            }
    
            
        
        }).catch((error) => {
            return res.status(500).json({message: error.message})
        })



    }).catch((error) => {
        return res.status(500).json({message: error.message, msg: "Email is not registered"});
    })


    

}


// add a comment
export function addComment(req, res) {

    const videoId = req.params.id;
    const { text } = req.body;


    
    if (text.length < 1) {
        return res.status(400).json({message: "Write something to add in comment box", key: "error"});
    }

    let randomId = Math.floor(Math.random() * 100);
    const newComment = {commentId:`0${randomId}`, text, like:'0', dislike:'0', timestamp:`${new Date()}`}

    contentModel.findOneAndUpdate({videoId}, { $push: { comments: newComment  } }).then((data) => {

        if (!data) {
            return res.status(400).json({message: `No such data with id: "${videoId}" to update comments`})
        }

        return res.status(201).json({message: "Comments successfully updated", update: req.body })
    
    
    }).catch((error) => {
        return res.status(500).json({message: error.message});
    })


}

// get comments
export function getComments(req, res) {

    const videoId = req.params.videoId;

    contentModel.findOne({videoId: videoId}).then((data) => {

        if(!data) {
            return res.status(404).json({message: "Data Not Found"});
        }

        return res.status(200).json(data.comments);
    
    }).catch((error) => {
        return res.status(500).json({message: error.message});
    })

} 


// update like
export function updateLike(req, res) {

    const videoId = req.params.videoId;
    const commentId = req.params.commentId;

    const { like } = req.body;
    
    contentModel.findOneAndUpdate({'videoId': `${videoId}`, "comments.commentId": commentId},
      {$set: {"comments.$.like": like}}  
    ).then((data) => {

        if (!data) {
            return res.status(404).json({message: "No data found"})
        }

        

        return res.status(200).json(data.comments);
    
    }).catch((error)=> {
        return res.status(500).json({message: error.message})
    })
} 

// get like
export function getLike(req, res) {

    const videoId = req.params.videoId;
    const commentId = req.params.commentId;

    contentModel.findOne({videoId: `${videoId}`, "comments.commentId": commentId},
    ).then((data) => {

        if(!data) {
            return res.status(404).json({message: "No Comment Found"})
        }

        return res.status(200).json(data.comments)
    
    }).catch((error) => {
        return res.status(500).json({message: error.message})
    })

}



// delete like
export function deleteLike(req, res) {

    const videoId = req.params.videoId;
    const commentId = req.params.commentId;

    const { like } = req.body;
    
    if (like < 0) {
        return res.status(204).json({message: "Can't decrease from 0"})
    }
    else {
        contentModel.findOneAndUpdate({'videoId': `${videoId}`, "comments.commentId": commentId},
        {$set: {"comments.$.like": like}}  
        ).then((data) => {

            if (!data) {
                return res.status(404).json({message: "No data found"})
            }


            return res.status(200).json(data.comments);
        
        }).catch((error)=> {
            return res.status(500).json({message: error.message})
        })
    }
} 


// delete comment
export function deleteComment(req, res) {

    const videoId = req.params.videoId;
    const commentId = req.params.commentId;

    contentModel.findOneAndUpdate({videoId: videoId}, {$pull: {comments: {commentId: commentId}}}).then((data => {

        if(!data) {
            return res.status(404).json({message: `No Such Comments with the id: ${commentId}`});
        }

        return res.status(200).send(data);
    
    })).catch((error) => {
        return res.status(500).json({message: error.message});
    })
    
}