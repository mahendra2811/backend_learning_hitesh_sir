import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler (async(req, res) =>{
    // steps follow jo kerne ha apn koo
    // user se data lene se pehle..
    // 1. validate the data
    // 2. check if user already exists
    // 3. upload  them to cloudinary and avatar 
    
    
    // ye use kiya tha post man se first time connection ke liye 
    // res.status(200).json({
        //     message:"OK is mmy message"
        // })
        

        const {fulllName , email ,username , password } = req.body
        console.log("email: " , email  );

        if(
            [fulllName , email , username , password].some((field)=> field?.trim()=="")   //empty hoga to true hoga apne aap 
        ){
            throw new ApiError(400 , " all field are required ")
        }

        const existedUser = User.findOne({
            $or: [{ username } , { email }]
        })

        if(existedUser){
            throw new ApiError(409 ,  "Userwith with email and username already exit" )
        }
        
        // avatar ko handle 
        // multer hame file ka acces kereta ha 
        const avatarLocalPath =  req.files?.avatar[0]?.path;
        const coverImageLocalPath =  req.files?.coverImage[0]?.path;

        if (!avatarLocalPath) {
            throw new ApiError(400 , "Avatar file is required")
        }
        // upload them to cloudinary 
        // cloudinary se upload kerne ke liye

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){
            throw new ApiError(400, "Avatar file is required ")
        }

        // create a object and db me entry ker dee
        const user = await User.create({
            fulllName ,
            avatar: avatar.url ,
            // cover iamge kla validation ekrna pad3ega 
            coverImage: coverImage.url?.url || "" ,
            email ,
            password,
            username: username.toLowerCase()
        })
        const createdUser = await  User.findById(user._id).select(
            "-password -refreshToken"
        )
        // ab check kerege user aya ha ya nahi aya haa

        if(!createdUser){
            throw new Error (500 , " so,ethiongn went wrong while registering tghe user  ")

        }
        return res.status(201).json(
            new ApiResponse(200, createdUser , "user registereed succesfully")
        )
    })

export 
{
    registerUser ,
}