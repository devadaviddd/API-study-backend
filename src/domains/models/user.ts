import { BadRequestionException } from '../../exceptions';
import { isStringEmptyOrUndefined } from '../../utils';
import { v4 as uuid } from 'uuid';

export interface UserProps {
  email: string | null | undefined;
  password: string | null | undefined;
  username: string | null | undefined;
  id?: string;
  phoneNumber?: string,
  userToken?:string
}

export class User {
  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get username() {
    return this.props.username;
  }

  public get phoneNumber() {
    return this.props.phoneNumber;
  }

  public get userToken() {
    return this.props.userToken;
  }

  public get id() {
    return this.props.id;
  }

  public setUserToken(token: string):void {
    this.props.userToken = token;
  }

  constructor(private readonly props: UserProps) {
    if (!props)
      throw new BadRequestionException('Props of user is null/undefined');

    const {email, password, username, phoneNumber, id, userToken} = props;
    if (isStringEmptyOrUndefined(email)) {
      throw new BadRequestionException('Email is null/undefined');
    }

    if (isStringEmptyOrUndefined(password)) {
      throw new BadRequestionException('Password is null/undefined');
    }
    if (isStringEmptyOrUndefined(username)) {
      throw new BadRequestionException('Username is null/undefined');
    }
    if (!phoneNumber) {
      this.props.phoneNumber = '';
    }
    if (!id) {
      this.props.id = uuid();
    }
    if(!userToken) {
      this.props.userToken = '';
    }
  }
}
