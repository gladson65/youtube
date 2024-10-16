import jwt from 'jsonwebtoken';
import userModel from '../Model/users.model.js';


export function verfyToken(req, res, next) {

    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {

        jwt.verify(req.headers.authorization.split(" ")[1], "secretKey", function(error, verifiedToken) {

            if (error) {
                return res.status(403).json({message: error.message})
            }

            userModel.findById(verifiedToken._id).then((user) => {
                req.user = user;
                next();
            
            }).catch((error) => {
                return res.status(500).json({message: error.message});
            })
        })
    }
    else {
        return res.status(403).json({message: "token is not present"})
    }
}