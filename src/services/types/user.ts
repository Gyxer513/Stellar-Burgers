/* cSpell:disable; */

export interface IuserData {
  email?: string;
  password?: string;
  name?: string;
  token?: string;

}
export interface IUserFullData {
  user: IuserData;
  refreshToken: string;
  accessToken: string;
}