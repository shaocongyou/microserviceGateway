export interface IStandardProcedures {
  id?: number;
  isActive?: boolean;
  specification?: string;
  userLogin?: string;
}

export class StandardProcedures implements IStandardProcedures {
  constructor(
    public id?: number,
    public isActive?: boolean,
    public specification?: string,
    public userLogin?: string,
  ) {
    this.isActive = this.isActive ?? false;
  }
}
