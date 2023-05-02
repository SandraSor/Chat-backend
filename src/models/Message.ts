import mongoose, { Schema } from 'mongoose';

export interface IMessage {
	text: string;
	dialog: {
		type: Schema.Types.ObjectId;
		ref: string;
	};
	unread: boolean;
}

//TODO: Сделать вложения
// attachments:[],

const MessageSchema = new Schema(
	{
		text: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		unread: {
			type: Boolean,
			default: false,
		},
		dialog: {
			type: Schema.Types.ObjectId,
			ref: 'Dialog',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
