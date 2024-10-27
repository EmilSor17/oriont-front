import { AddressDTO } from "./addressDTO";
import { IdentificationDTO } from "./identificationDTO";
import { IdGeneralDTO } from "./idGeneralDTO";
import { PersonDTO } from "./personDTO";

export interface CustomerDTO {
    AddressDTO: AddressDTO;
    IdentificationDTO: IdentificationDTO;
    IdGeneralDTO: IdGeneralDTO;
    PersonDTO: PersonDTO;
  }
  