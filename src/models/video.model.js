import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videofile:{
            type: String, ///cloudinart url
            required: true,
        },
        thumbnail:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true,
            trim: true,
            index:true 
        },
        description:{
            type: String,
            required: true,
            trim: true
        },
        duration:{
            type: Number,
            required: true
        },
        views:{
            type: Number,
            default: 0
        },
        isPublishsed:{
            type: Boolean,
            default: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate) ///ab agreagation plugines yha likh sakte haa

export const video = mongoose.model("Video" , videoSchema)
