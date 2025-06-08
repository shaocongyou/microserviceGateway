export interface IStandardProcedures {
  id?: number;
  isActive?: boolean;
  specification?: string;
  userUUID?: string;
}

export class StandardProcedures implements IStandardProcedures {
  constructor(
    public id?: number,
    public isActive?: boolean,
    public specification?: string,
    public userUUID?: string,
  ) {
    this.isActive = this.isActive ?? false;
  }
}
