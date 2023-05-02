import express from 'express';
import bcrypt from 'bcrypt';

import { UserModel } from '../models';
import { IUser } from '../models/User';
import { createJWTToken } from '../utils';

class UserController {
	show(req: express.Request, res: express.Response) {
		const id: string = req.params.id;
		UserModel.findById(id)
			.then((user) => {
				if (user) {
					res.json(user);
				}
			})
			.catch(() => {
				res.json({ messages: 'User not Found' });
			});
	}

	delete(req: express.Request, res: express.Response) {
		const id: string = req.params.id;
		UserModel.findByIdAndRemove(id)
			.then((user) => {
				if (user) {
					res.json({ message: `User ${user.fullname} Deleted` });
				}
			})
			.catch(() => {
				res.json({ messages: 'User not Found' });
			});
	}

	getMe(req: express.Request, res: express.Response) {
		const id: string = req.user._id;
		UserModel.findById(id)
			.then((user) => {
				if (user) {
					res.json(user);
				}
			})
			.catch(() => {
				res.json({ messages: 'User not Found' });
			});
	}

	create(req: express.Request, res: express.Response) {
		const postData = {
			email: req.body.email,
			fullname: req.body.fullname,
			password: req.body.password,
		};
		const user = new UserModel(postData);
		user
			.save()
			.then((obj: any) => {
				res.json(obj);
			})
			.catch((reason) => {
				res.json(reason);
			});
	}

	login(req: express.Request, res: express.Response) {
		const postData = {
			email: req.body.email,
			password: req.body.password,
		};

		UserModel.findOne({ email: postData.email })
			.then((user: any) => {
				if (bcrypt.compareSync(postData.password, user.password)) {
					const token = createJWTToken(user);
					res.json({
						status: 'success',
						token,
					});
				} else {
					return res.json({
						status: 'error',
						message: 'Incorrect email or password',
					});
				}
			})
			.catch(() => {
				return res.json({ message: 'User not found' });
			});
	}
}

export default UserController;
