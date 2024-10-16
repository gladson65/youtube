import userModel from "../Model/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// creating register api
export function register(req, res) {

    const {username, email, password} = req.body;

    // Key validations
    if (!username) {
        return res.status(400).json({message: "Key should be 'username'"})
    }

    if (!email) {
        return res.status(400).json({message: "Key should be 'email'"})
    }

    if (!password) {
        return res.status(400).json({message: "Key should be 'password'"})
    }


    // field validations
    //name validation
    if(username.length < 5) {
        return res.status(400).json({message: "Full Name must be 5 characters."})
    } 

    // email validation
    if(email) {
        let test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        if (!test) {
            return res.status(400).json({message: "Invalid Email Format"})
        }
    
    }

    // password validation
    if(password) {
        let test = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);
        if(!test){
            return res.status(400).json({message: "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."})
        }
        
    }


    // check the email is already in database or not then create if no existence
    userModel.findOne({email: email}).then((data) => {

        if (!data) {

            // preparing data to send into database
            const newUser = new userModel({
                username,
                email,
                password: bcrypt.hashSync(password, 10)
            })

            newUser.save().then((data) => {
                res.status(201).json({message: "User Registration Successfull", User: data});
            })
        }
        else {
            return res.status(400).json({message: "User already exist, try with another email"})
        }
    
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })


}





// creating login api
export function login(req, res) {
    
    const { email, password } = req.body;

    // Key validations
    if (!email) {
        return res.status(400).json({message: "Key should be 'email'"})
    }

    if (!password) {
        return res.status(400).json({message: "Key should be 'password'"})
    }


    userModel.findOne({email: email}).then((data) => {

        if (!data) {
            return res.status(400).json({message: "User is not registered"})
        }

        const isValidPassword = bcrypt.compareSync(password, data.password);

        if (!isValidPassword) {
            return res.status(403).json({message: "Invalid Password"})
        }
        else {
            let token = jwt.sign({id: data._id}, "secretKey", {expiresIn: '60m'})

            console.log(token)
            res.json({User: data.username, email: data.email, accessToken: token})
        }
        
    
    }).catch((error) => {
        return res.status(500).json({error: error.message})
    })
}