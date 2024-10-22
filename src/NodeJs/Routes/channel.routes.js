import {
    createChannel
} from "../Controller/channel.controller.js"


export function channelRoutes(app) {
    app.post("/channel/:email", createChannel);
}