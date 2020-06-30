import * as firebase from 'firebase'
import * as moment from 'moment'


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
    const blank: UserInfo = {} as UserInfo
    Object.assign(this, clone)

    if (this.birth && this.birth instanceof firebase.firestore.Timestamp) {
      this.birth = this.birth.toDate()
    }

    // if(!this.registeredDate)
    //   this.registeredDate = new Date();

    if (this.registeredDate instanceof firebase.firestore.Timestamp) {
      this.registeredDate = this.registeredDate.toDate()
    }

    if (!this.phoneNumbers) {
      this.phoneNumbers = ['', '']
    }

    while (this.phoneNumbers.length < 2) {
      this.phoneNumbers.push('')
    }
  }

  getAge(): number {
    return moment().startOf('year').diff(moment(this.birth).startOf('year'), 'years') + 1
  }
}
