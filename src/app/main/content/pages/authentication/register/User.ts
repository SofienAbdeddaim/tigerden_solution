export class User
{
  name           : string;
  email          :string;
  password       : string;
  passwordConfirm: string;
  constructor(user) {
    {
      this.name = user.name || '';
      this.email = user.email || '';
      this.password = user.password || '';
      this.passwordConfirm = user.passwordConfirm || '';
    }
  }
}
