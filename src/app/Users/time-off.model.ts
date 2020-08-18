export interface TimeOff {
  _id: string;
  from: Date;
  to: Date;
  reason: string;
  userid: string;
  name: string;
  status: string;
}

// tslint:disable-next-line: class-name
export interface gettimeoff {
  from: Date;
  to: Date;
  reason: string;
  userid: string;
  name: string;
  status: string;
}
