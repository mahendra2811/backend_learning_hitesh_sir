import multer from "multer";

// disk ki jagh memory storage bhi ker sakte haa
// memory storage me file ko memory me store kerta haa
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp" )  //kaha storage kerna ha..
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer(
    {
         storage,
    })