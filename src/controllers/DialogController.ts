import express from 'express';
import mongoose from 'mongoose';

import { DialogModel, MessageModel } from '../models';

class DialogController {
	index(req: express.Request, res: express.Response) {
		const authorId = req.user._id;

		DialogModel.find({ author: authorId })
			.populate(['author', 'partner'])
			.then((dialogs) => {
				res.json(dialogs);
			})
			.catch(() => {
				res.json({ messages: 'Dialogs not Found' });
			});
	}

	delete(req: express.Request, res: express.Response) {
		const id: string = req.params.id;
		DialogModel.findByIdAndRemove(id)
			.then((dialog) => {
				if (dialog) {
					res.json({ message: 'Dialog deleted' });
				}
			})
			.catch(() => {
				res.json({ messages: 'Dialog not Found' });
			});
	}

	create(req: express.Request, res: express.Response) {
		const postData = {
			author: req.body.author,
			partner: req.body.partner,
		};
		const dialog = new DialogModel(postData);
		dialog
			.save()
			.then((dialogObj: any) => {
				// res.json(dialogObj);
				const message = new MessageModel({
					text: req.body.text,
					user: req.body.author,
					dialog: dialogObj._id,
				});
				message
					.save()
					.then((messageObj: any) => {
						res.json(dialogObj);
					})
					.catch((reason) => {
						res.json(reason);
					});
			})
			.catch((reason) => {
				res.json(reason);
			});
	}
}

export default DialogController;
