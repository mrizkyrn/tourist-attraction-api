import multer from 'multer';

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/images'); // Define destination folder
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Define filename
   },
});

const fileFilter = (req: any, file: any, cb: any) => {
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
   } else {
      cb(new Error('File type not supported'), false);
   }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export { upload };