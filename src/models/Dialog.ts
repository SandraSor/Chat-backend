import mongoose, { Schema } from 'mongoose';

export interface IDialog {
	author: {
		type: Schema.Types.ObjectId;
		ref: string;
	};
	partner: {
		type: Schema.Types.ObjectId;
		ref: string;
	};
	lastMessage: {
		type: Schema.Types.ObjectId;
		ref: string;
	};
}

const DialogSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		partner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
	},
	{
		timestamps: true,
	}
);

const Dialog = mongoose.model<IDialog>('Dialog', DialogSchema);

export default Dialog;
