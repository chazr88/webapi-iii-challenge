const express = require('express')
const postRouter = require('./posts/postRouter.js');
const usersRouter = require('./users/userRouter.js');



const server = express();
server.use(logger);
server.use(express.json())
server.use('/api/posts', postRouter);
server.use('/api/users', usersRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Web API III Challenge deployed to Heroku for Web API IV Challange!</h2>`)
});


//custom middleware

function logger(req, res, next) {
  console.log(`${new Date().toISOString()}] ${req.method} to ${req.url}`)
  next();
};

module.exports = server;
