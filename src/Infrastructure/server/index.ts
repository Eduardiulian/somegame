import http from 'http';
import cookieParser from 'cookie-parser';
import * as io from "socket.io"
import express from 'express';
import cors from 'cors';
import { IDirection } from '../../domain/IDirection.js';

import bodyParser from 'body-parser';
import logger from './logger.js'


import Game from './factories/gameFactory.js'



let app = express();


app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors({
  credentials: true, origin: '*'
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://5.35.89.173');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


//

const server = http.createServer(app);
const socketio = new io.Server(server, {
  cors: {
    origin: '*',
  },
  path: '/api/websocket'
});


const port = process.env.PORT || 5000;


server.listen(port, () => {
  logger.info(`Server is up and running on port ${port}`);
  console.log(`Server is up and running on port ${port}`);
});

socketio.on('connection', socket => {
  console.log('Player connected!', socket.id);
  logger.info(`Player connected! ${socket.id}`);

  socket.on('JOIN_GAME', joinGame);
  socket.on('INPUT', handleInput);
  socket.on('INPUT_KEY', handleInputKey);
  socket.on('SHOOT_KEY', handleShootKey);
  socket.on('SPACE_KEY', handleSpaceKey);
  socket.on('disconnect', onDisconnect);

});


const game = new Game().build();

function joinGame(this: io.Socket, username: string) {
  game.addPlayer(this, username);
}

function handleInput(this: io.Socket, dir: IDirection) {
  game.handleInput(this, dir);
}

function handleInputKey(this: io.Socket, dir: IDirection,dirAngle:number) {
  game.handleInputKey(this, dir,dirAngle);
}

function handleShootKey(this: io.Socket, dir: number) {
  game.handleShootKey(this, dir);
}
function handleSpaceKey(this: io.Socket,) {
  game.handleSpaceKey(this);
}

function onDisconnect(this: io.Socket) {
  game.removePlayer(this);
}



export default app;



