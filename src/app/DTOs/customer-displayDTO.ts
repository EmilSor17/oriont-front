export interface CustomerDisplayDTO {
  id: number;
  name: string;
  lastName: string;
  identification: {
    identificationNumber: string;
    idPerson: number;
    identificationType: number;
    person: any | null;
    id: number;
  };
  address: {
    idPerson: number;
    house: string;
    street: string;
    neighborhood: string;
    country: string;
    person: any | null;
    id: number;
  };
}
