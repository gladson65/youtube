import channelModel from "../Model/channel.model.js";
import contentModel from "../Model/contents.model.js";



export function createChannel(req, res) {

    const email = req.params.email;
    const { name, handle } = req.body;

    if (name.length < 1) {
        return res.status(400).json({message: "Name must be filled", key: "error"});
    }

    if (handle.length < 1) {
        return res.status(400).json({message: "Handle must be filled", key: "error"});
    }   


    channelModel.findOne({name: name}).then((data) => {

        if (!data) {

            const newChannel = channelModel({
                email,
                name,
                handle
            })

            newChannel.save().then((data) => {
               
                if (!data) {
                    return res.status(400).json({message: "Something went wrong try again later"})
                }
        
                return res.status(201).json({message: "Channel Successfully Created", data})
           
            })
        }

        else {
            return res.status(400).json({message: "Channel Already Exists"})
        }

    
    }).catch((error) => {
        return res.status(500).json({message: error.message});
    })


}