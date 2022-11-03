import {fileURLToPath} from 'url';
import { dirname } from 'path';
// import multer from 'multer';

const __filename  = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// // cómo almacena multer
// const storage = multer.diskStorage({
//     destination:function(req, file, cb){
//         cb(null, __dirname+'/public/images')
//     },
//     filename:function(req, file, cb){
//         cb(null, file.originalname + '-' + Date.now())
//     }
// })

// // para guardarlo
// export const uploader = multer({storage})

export default __dirname