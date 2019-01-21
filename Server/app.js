var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  User = require('./models/userschema'),
  bodyParser = require('body-parser');
// MongoDB
// var mongoUrl = 'mongodb://localhost:27017/G-Projects';
var mongoUrl = 'mongodb://localhost/G-Projects';
mongoose.connect(mongoUrl, {
  useMongoClient: true
}, function(err) {
  console.log(err || `Connected to MongoDB: ${mongoUrl}`);
});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var routes = require('./routes/sessionroutes');
routes(app);
app.listen(3000, () => console.log(`started on port 3000 successfully...`));
