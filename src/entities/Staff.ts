export class StaffEntity {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;

  constructor(name: string, email: string, password: string, id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
