import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({

    destination(req,file,cb){

        let folder = "public/images/games";

        if(req.originalUrl.includes("/profile")){
            folder = "public/uploads/avatar";
        }

        fs.mkdirSync(folder,{recursive:true});

        cb(null,folder);

    },

    filename(req,file,cb){

        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );

    }

});

const upload = multer({

    storage,

    limits:{
        fileSize:5*1024*1024
    },

    fileFilter(req,file,cb){

        const ext = path.extname(file.originalname).toLowerCase();

        if([".png",".jpg",".jpeg",".webp"].includes(ext)){

            cb(null,true);

        }else{

            cb(new Error("Format gambar tidak didukung"));

        }

    }

});

export default upload;
