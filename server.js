   var express = require('express')
   var multer = require('multer'),
       bodyParser = require('body-parser'),
       path = require('path'),
       numeral = require('numeral')

   var app = express();
   app.use(bodyParser.json());
   app.set('views', path.join(__dirname, 'views'));
   app.set('view engine', 'jade');


   app.get('/', function(req, res) {
       res.render('index', {
           title: "Upload a file to get it's size"
       });
   });

   app.post('/', multer({
       dest: './uploads/'
   }).single('upl'), function(req, res) {
       console.log(req.file); 
       res.write("Filesize (kb): "+ numeral(req.file.size).format("0.0"));
       res.end();
   });

   var port = +process.env.PORT || 8080;

   app.listen(port, function() {
       console.log('Example app listening on port 8080!')
   });