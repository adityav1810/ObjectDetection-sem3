var express = require('express');
var app = express();
var path = require('path');

const multer = require('multer');
const ejs = require('ejs');

const { exec } = require('child_process');
var shell = require('shelljs');
var Jimp = require('jimp');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './backend/images/input/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + path.extname(file.originalname));
    }
  });

  // Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('input');


  // Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
   
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }



app.use(express.static(path.join(__dirname, 'public')));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('index');
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (shell.exec('python3 ./backend/samples/demo.py').code !== 0) {
        shell.echo('Error: Python script not running');
        shell.exit(1);
      }
      if(err){
        res.render('index', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('index', {
            msg: 'Error: No File Selected!'
          });
        } else {
          res.render('index', {
            msg: 'File Uploaded!',
            file: `/output/${req.file.filename}`
          });
        }
      }
    });
  });
  
const port=3000;

app.listen(port, () => console.log(`Server started on port ${port}`));