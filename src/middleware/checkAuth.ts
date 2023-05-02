import express from 'express';
import { verifyJWTToken } from '../utils';
import { IUser } from '../models/User';
import { DecodedData } from '../utils/verifyJWTToken';

const checkAuth = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
): void => {
	if (
		// req.path === '/user/signin' ||
		// req.path === '/user/signup' ||
		// req.path === '/user/verify' ||
		req.path === '/user/registration' ||
		req.path === '/user/login'
	) {
		return next();
	}

	const token: string | null =
		'token' in req.headers ? (req.headers.token as string) : null;

	console.log('token', token);
	if (token) {
		verifyJWTToken(token)
			.then((user: DecodedData | null) => {
				if (user) {
					req.user = user.data._doc;
				}
				next();
			})
			.catch(() => {
				res.status(403).json({
					message: 'Invalid auth token provided.',
				});
			});
	}
};

export default checkAuth;
