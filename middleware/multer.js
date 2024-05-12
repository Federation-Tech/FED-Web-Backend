const multer = require('multer');

// Multer middleware for storing images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../transaction/uploads/images');
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    const uniqueSuffix =  req.user.RollNumber+'-'+ req.body.txnid + '-' + Date.now() +'-'+ Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const uploadImage = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});



module.exports = uploadImage;
