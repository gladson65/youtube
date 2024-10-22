import mongoose from "mongoose";

const { Schema } = mongoose;

const youtubeChannel = new Schema({
    email: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    handle: {
        type: String,
        required: true,
    }
})

const channelModel = mongoose.model("channel", youtubeChannel);
export default channelModel;
