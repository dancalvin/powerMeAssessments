interface ILifeOmicPatientName {
  use: string;
  family: string;
  given: string[]
}

export interface ILifeOmicPatient {
  id: string;
  address: any[];
  name: ILifeOmicPatientName[];
}
