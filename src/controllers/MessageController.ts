import express from 'express';

import { MessageModel } from '../models';

class MessageController {
	show(req: express.Request, res: express.Response) {
		const dialogId = req.query.dialog;
		MessageModel.find({ dialog: dialogId })
			.populate('dialog')
			.then((message) => {
				if (message) {
					res.json(message);
				}
			})
			.catch(() => {
				res.json({ messages: 'Messages not Found' });
			});
	}

	create(req: express.Request, res: express.Response) {
		const userId = req.user._id;

		const postData = {
			text: req.body.text,
			dialog: req.body.dialog_id,
			user: userId,
		};
		const message = new MessageModel(postData);
		message
			.save()
			.then((obj: any) => {
				res.json(obj);
			})
			.catch((reason) => {
				res.json(reason);
			});
	}

	delete(req: express.Request, res: express.Response) {
		const id: string = req.params.id;
		MessageModel.findByIdAndRemove(id)
			.then((message) => {
				if (message) {
					res.json({ message: 'Message Deleted' });
				}
			})
			.catch(() => {
				res.json({ messages: 'Message not Found' });
			});
	}
}

export default MessageController;
