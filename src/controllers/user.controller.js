import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler (async(req, res) =>{
    // steps follow jo kerne ha apn koo
    // user se data lene se pehle..
    // 1. validate the data
    // 2. check if user already exists
    // 3. upload  them to cloudinary and avatar 
    // ......
    // const {fulllName , email , password } = req.body
    // console.log("full Name : " fulllName , " Email " email , password);

    res.status(200).json({
        message:"OK is mmy message"
    })
})

export {registerUser}