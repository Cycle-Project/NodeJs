const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const path = require('path');
const { Router } = require('express');
const router = express.Router();
const auth = require("./security/middleware/auth");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');
//const swaggerFile = require('../swagger-output.json')
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
app.use('/api/users', require('./routes/users.js'), auth);

app.use('/api/stores', require('./routes/stores.js'), auth);

app.use('/api/post', require('./routes/posts.js'), auth);

app.use('/api/route', require('./routes/route.js'), auth);

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


const PORT = process.env.PORT || 4652;
app.use('/', router);
app.listen(PORT, () =>

  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);







