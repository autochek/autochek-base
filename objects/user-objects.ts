import * as firebase from 'firebase';
import * as moment from 'moment';


export interface UserInfo {
	email: string | null;
	photoURL: string | null;
	uid: string;


	// App data area
	name: string;
	gender: 'male' | 'female';
	birth: Date | firebase.firestore.Timestamp;
	height: number;
	weight: number;

	registeredDate: Date | firebase.firestore.Timestamp;
	phoneNumbers: string[];

	parent?: string;
}


// ==============================class area ================================== //


export class UserInfo {
	// /user_info/${uid}
	constructor(clone?: UserInfo) {

		Object.assign(this, clone);

		if (this.birth && this.birth instanceof firebase.firestore.Timestamp) {
			this.birth = this.birth.toDate();
		}

		// if(!this.registeredDate)
		//   this.registeredDate = new Date();

		if (this.registeredDate instanceof firebase.firestore.Timestamp) {
			this.registeredDate = this.registeredDate.toDate();
		}

		if (!this.phoneNumbers) {
			this.phoneNumbers = ['', ''];
		}

		while (this.phoneNumbers.length < 2) {
			this.phoneNumbers.push('');
		}
	}

	/**
	 * 사용자의 화면 표시명을 가져온다.
	 */
	get displayName(): string {
		return UserInfo.getDisplayName(this.name, this.email);
	}

	/**
	 * 사용자의 화면 표시명을 가져온다.
	 * @param name 사용자명
	 * @param email 이메일
	 */
	static getDisplayName(name: string, email: string): string {

		if (!name && !email) {
			return '';
		} else {
			if (!name) {
				return email;
			} else if (!email) {
				return name;
			} else {
				return `${name} (${email})`;
			}
		}
	}

	getAge(): number {
		return moment().startOf('year').diff(moment(this.birth).startOf('year'), 'years') + 1;
	}
}
