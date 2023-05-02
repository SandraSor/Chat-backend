import jwt, { VerifyErrors } from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface DecodedData {
	data: {
		_doc: IUser;
	};
}

const verifyJWTToken = (token: string): Promise<DecodedData | null> =>
	new Promise(
		(
			resolve: (decodedData: DecodedData) => void,
			reject: (err: VerifyErrors | null) => void
		) => {
			if (process.env.JWT_SECRET) {
				jwt.verify(
					token,
					process.env.JWT_SECRET || '',
					(err: VerifyErrors | null, decodedData) => {
						if (err || !decodedData) {
							return reject(err);
						}
						resolve(decodedData as DecodedData);
					}
				);
			}
		}
	);

export default verifyJWTToken;
