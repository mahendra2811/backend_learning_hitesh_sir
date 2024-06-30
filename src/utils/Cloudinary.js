
import { v2 as cloudinary } from 'cloudinary'; //esme hamen v2 ko cloudinary name diya ha 


(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: ProcessingInstruction.env.CLOUDINARY_CLOUD_NAME, 
        api_key: ProcessingInstruction.env.CLOUDINARY_API_KEY, 
        api_secret: ProcessingInstruction.env.CLOUDINARY_API_SECRET 
        // Click 'View Credentials' below to copy your API secret
    });
    


    // proper orignise keregee
    // thoda pasida ha...try catch lagayeegee

    const uploadOnCloudinary = async (localFilePath)=>{
        try{
            if(!localFilePath)  return null 
            // upload the file path
            const response = await cloudinary.uploader.upload(localFilePath , {
                resource_type: "auto"
            })
            // file has uploaded successufullyy...
            console.log("file is uploaded succesfully" , response.url );
            return response ;
        }catch(error){
            fs.unlinkSync(localFilePath) //remove the locally save temporary file as the upload operation got failed 
            return null ;
        }
    }








/*
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
    */

    
})();

