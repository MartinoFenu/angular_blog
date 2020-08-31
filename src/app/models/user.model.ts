export interface FetchedUser {
  id: number;
  name?: string;
  username: string;
  email: string;
  address: {};
  phone: string;
  ebsite: string;
  company: {};
}

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}