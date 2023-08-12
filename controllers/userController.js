const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")
const bcrypt = require("bcrypt")
//@desc register a user
//@route post/api/users/register
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password}= req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error ("all feild are mandatory!")
    }
    const userAvalibe = await User.findOne({email});
    if(userAvalibe){
        res.status(400)
        throw new Error ("user already exist")    
    }
    //Hash password 
    const hashPassword = await bcrypt.hash(password, 10)
    console.log("hashed password", hashPassword)
    const user = User.create({
        username,
        email,
        password: hashPassword,
    });
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(401)
        throw new Error("User data is not valid")
    }
    res.json({message: "Register the users"})
    
}); 

//@desc login user
//@route post/api/users/register
//@access public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("all feilds are mandatory")
    }
    const user = await User.findOne({email})
    //compare password with hash password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
}); 

//@desc register a user
//@route post/api/users/register
//@access private
const currentUser = asyncHandler(async(req, res) => {
    res.json({message: "current users info."})
}); 

module.exports = {registerUser, loginUser, currentUser}