import jwt from 'jsonwebtoken';
import { reduce } from 'lodash';
import { IUser } from '../models/User';

interface ILoginData {
	email: string;
	password: string;
}

const createJWTToken = (user: ILoginData) => {
	const token = jwt.sign(
		{
			data: reduce(
				user,
				(result: any, value: string, key: string) => {
					if (key !== 'password') {
						result[key] = value;
					}
					return result;
				},
				{}
			),
		},
		process.env.JWT_SECRET || '',
		{ algorithm: 'HS256', expiresIn: process.env.JWT_MAX_AGE }
	);

	return token;
};

export default createJWTToken;
