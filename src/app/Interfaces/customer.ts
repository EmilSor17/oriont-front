import { AddressDTO } from "../DTOs/addressDTO";
import { IdentificationDTO } from "../DTOs/identificationDTO";
import { IdGeneralDTO } from "../DTOs/idGeneralDTO";
import { PersonDTO } from "../DTOs/personDTO";


export interface Customer {
  Address: AddressDTO;
  Identification: IdentificationDTO;
  IdGeneral: IdGeneralDTO;
  Person: PersonDTO;
}
