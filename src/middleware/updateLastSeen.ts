import express from 'express';
import { UserModel } from '../models';

const updateLastSeen = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	// UserModel.findOneAndUpdate(
	// 	{ _id: '64233555f982904076e6eda0' },
	// 	{
	// 		$set: {
	// 			last_seen: new Date(),
	// 		},
	// 	},
	// 	{ new: true }
	// );

	UserModel.updateOne(
		{ _id: '64233555f982904076e6eda0' },
		{
			$set: {
				last_seen: new Date(),
			},
		}
	).catch((err) => {
		console.log(err);
	});
	next();
};

export default updateLastSeen;
