import multer from "multer";

const ds = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

class MulterSingleton {
  static instance: multer.Multer;

  constructor() {}

  static getInstance() {
    if (!MulterSingleton.instance) {
      MulterSingleton.instance = multer({ storage: ds });
    }

    return MulterSingleton.instance;
  }
}

export default MulterSingleton;
