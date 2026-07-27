import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"public/images/games");

    },


    filename:(req,file,cb)=>{

        const ext = path.extname(file.originalname);

        const name =
        Date.now() + ext;


        cb(null,name);

    }

});


const upload = multer({

    storage,

    limits:{
        fileSize: 5 * 1024 * 1024
    },

    fileFilter:(req,file,cb)=>{

        const allowed = [
            ".png",
            ".jpg",
            ".jpeg",
            ".webp"
        ];


        const ext =
        path.extname(file.originalname)
        .toLowerCase();


        if(allowed.includes(ext)){

            cb(null,true);

        }else{

            cb(new Error("Format gambar tidak didukung"));

        }

    }

});


export default upload;
