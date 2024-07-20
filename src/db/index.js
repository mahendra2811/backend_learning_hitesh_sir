import mongoose from "mongoose";

import {DB_NAME} from "../constants.js";


const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected!! DB HOST  ${connectionInstance.host}`);  
        //connection kaha ho rha ha uska pata rhae hame esliye kerte ha mainly esko tooo
    }
    catch(error){
        console.log("Error connecting to the database" , error );
        process.exit(1)
    }
}

export default connectDB
