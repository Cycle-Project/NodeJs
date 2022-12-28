const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const path = require('path');
const { Router } = require('express');
const router = express.Router();

// load environment  vars

dotenv.config({ path: './config/config.env' });

//Connect to Database
connectDB();

const app = express();

//Body Parser
app.use(express.json({ limit: "5mb" }));


//Enable Cors
app.use(cors());

//Routes
app.use('/api/users', require('./routes/users.js'));

app.use('/api/stores', require('./routes/stores.js'));

app.use('/api/post', require('./routes/posts.js'));

app.use('/api/route', require('./routes/route.js'));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
  //__dirname : It will resolve to your project folder.
});


const PORT = process.env.PORT || 4652;
app.use('/', router);
app.listen(PORT, () =>

  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);







