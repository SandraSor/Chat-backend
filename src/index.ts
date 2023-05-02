import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { loginValidation } from './utils/validations';

import {
	UserController,
	DialogController,
	MessageController,
} from './controllers';

import { updateLastSeen, checkAuth } from './middleware';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

mongoose.connect('mongodb://127.0.0.1:27017/chat');

app.get('/user/:id', User.show);
app.get('/user/me', User.getMe);
app.delete('/user/:id', User.delete);
app.post('/user/registration', User.create);
app.post('/user/login', loginValidation, User.login);

app.get('/dialogs', Dialog.index);
app.delete('/dialogs/:id', Dialog.delete);
app.post('/dialogs', Dialog.create);

app.post('/messages', Message.create);
app.get('/messages', Message.show);
app.delete('/messages/:id', Message.delete);

app.listen(process.env.PORT, () => {
	console.log(`Server: http://localhost:${process.env.PORT}`);
});
