import {makeid} from 'autochek-base/Utils';
import * as firebase from 'firebase';

export abstract class FirestoreObjectBase {
	static tablename: string;

	abstract getDocname(): string;
}

export interface FcmToken {
	// /fcm_token/{uid}

	token: string;
	uid: string;
}

export interface FcmMessage {
	// /fcm_token/{uid}/messages/id
	id: string;
	title: string;
	message: string;
	photoRef: string;
	date: Date;
}

export class FcmMessage {
	constructor(clone?: any) {
		if (clone) {
			Object.assign(this, clone);
			if (clone.date instanceof firebase.firestore.Timestamp) {
				this.date = clone.date.toDate();
			}
		} else {
			this.id = makeid(40);
			this.date = new Date();
		}
	}
}
