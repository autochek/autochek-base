import { makeid } from 'autochek-base/Utils'
import * as firebase from 'firebase'
import * as moment from 'moment'
import { UserInfo } from './user-objects'


export interface UserGroup {
  // url : /user_group/${uid(group)}/uuid/${uid(user)}
  uid: string;
  registeredDate: Date;
}

export interface GroupInfo {
  // url : /group_info/${uid(group)}
  groupName: string;
  uid: string;
}


export interface GroupUserRaw {
  // url : /group/${uid(group)}/uuid/${uid(user)}
  guid: string;
  uid: string;
  user_code: string;
  patientCategory: string;
  patientNo: string;
  email: string;
  phone1: string;
  phone2: string;
  zipcode: string;
  address: string;
  address_detail: string;
}

export class UserGroup {
  constructor(uid: string, rdate: Date) {
    this.uid = uid
    this.registeredDate = rdate
  }

  static deserializer(val: any) {
    if (val.registeredDate instanceof firebase.firestore.Timestamp) {
      return new UserGroup(val.uid, val.registeredDate.toDate())
    }
    return new UserGroup(val.uid, val.registeredDate)
  }
}

export interface GroupUser extends UserInfo, GroupUserRaw {

}

export class GroupUser {
  constructor(gur: GroupUserRaw, ui: UserInfo, ug: UserGroup) {
    if (!ui) {
      throw new Error('GroupUser constructor - UserInfo is mandatory')
    }


    Object.assign(this, ui)
    if (gur) {
      Object.assign(this, gur)
    } else {
      if (ui.phoneNumbers && ui.phoneNumbers[0]) {
        this.phone1 = ui.phoneNumbers[0]
      }
      if (ui.email) {
        this.email = ui.email
      }
    }

    if (ug) {
      this.registeredDate = ug.registeredDate
    }
  }

  genGroupUserRaw(guid?: string): GroupUserRaw {
    const obj: GroupUserRaw = {
      guid: guid ? guid : this.guid,
      uid: this.uid,
      user_code: this.user_code,
      patientCategory: this.patientCategory,
      patientNo: this.patientNo,
      email: this.email,
      phone1: this.phone1,
      phone2: this.phone2,
      zipcode: this.zipcode,
      address: this.address,
      address_detail: this.address_detail,
    }

    for (const [key, value] of Object.entries(obj)) {
      if (!value) {
        obj[key] = ''
      }
    }

    return obj
  }

  getBmi(): number {
    return this.weight / (this.height * this.height) * 10000
  }

  getAge(): number {
    return moment().startOf('year').diff(moment(this.birth).startOf('year'), 'years') + 1
  }
}

export interface Consulting {
  // /group/{guid}/uuid/{uuid}/consulting/{cid}
  cid: string;
  startTime: Date;
  endTime: Date;
  boundType: string;
  eventType: string;
  title: string;
  description: string;
  managerName: string;
}

export class Consulting {
  constructor(clone?: any) {
    if (clone) {
      Object.assign(this, clone)
      if (clone.startTime instanceof firebase.firestore.Timestamp) {
        this.startTime = clone.startTime.toDate()
      }
      if (clone.endTime instanceof firebase.firestore.Timestamp) {
        this.endTime = clone.endTime.toDate()
      }

    } else {
      this.cid = makeid(20)
      this.startTime = new Date()
      this.endTime = new Date()
      this.boundType = '인바운드'
      this.eventType = '기기/앱'
    }
  }
}
