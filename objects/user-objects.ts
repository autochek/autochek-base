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

		const blank: UserInfo = {} as UserInfo;
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
		return UserInfo.getDisplayName(this);
	}

	/**
	 * 사용자의 화면 표시명을 가져온다.
	 * @param userInfo 사용자 정보 객체
	 */
	static getDisplayName(userInfo: UserInfo): string {
		// 사용자 정보가 유효한 경우
		if(userInfo) {
			if(userInfo.name.isEmpty() && userInfo.email.isEmpty)
				return "";
			else {
				if(this.name.isEmpty())
					return userInfo.email;
				else if(userInfo.email.isEmpty())
					return this.name;
				else
					return `${userInfo.name} (${userInfo.email})`;
			}
		}
		else {
			return "";
		}
	}

	getAge(): number {
		return moment().startOf('year').diff(moment(this.birth).startOf('year'), 'years') + 1;
	}
}
