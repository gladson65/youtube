import mongoose from "mongoose";

const { Schema } = mongoose;

const youtubeContent = new Schema({
    
    videoId: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    thumbnailUrl: {
        type: String,
        required: true
    },

    videoUrl: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    channelId: {
        type: String,
        required: true
    },

    channelPic: {
        type: String,
        require: true
    },

    uploader: {
        type: String,
        required: true
    },

    views: {
        type: String,
    },

    likes: {
        type: String,
    },

    dislikes: {
        type: String,
    },

    uploadDate: {
        type: String,
        timestamps: true
    },

    comments: {
        type: Array,
    }
})

const contentModel = mongoose.model('content', youtubeContent);
export default contentModel;