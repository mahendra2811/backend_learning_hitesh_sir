import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
        userName:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true ,
            index: true 
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true   
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
            index:true 
         },
        avator:{
            type: String,  ///cloudinary ki service use ker sakte haa
            // default: "https://www.gravatar.com/avatar/"
            required: true 
        },
        coverImage:{
            type: String,
        },
        watchHistory:{
            type: Schema.Types.ObjectId,
            ref:"Video"
        },
        password:{
            type:String,            //encrypt kerna padega show hame kuch solve kerna padega
            required:[true , 'Password is required ']

        },
        refreshToken:{
            type: String
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save" , async function(next){ //password bheju tabhi change krno baki avator and unme nahi
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10 )
        next()
    }
    else{
        return next();
    }

} )            //middleware ke next ko call kerna padta ha

userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id, //ye mongo db se mil jayege
            email:this.email,
            username:this.username,
            fullname:this.fullName,
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}
// ye basic function ha...
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id, 
        },

        process.env.REFRESH_TOKEN_SECREAT,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}

export const User = mongoose.model("User" , userSchema) 


// esme 2 modle banaye ha 
// user model , video model , 