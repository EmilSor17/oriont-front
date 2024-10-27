import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/Services/customer.service';
import { CustomerDTO } from 'src/app/DTOs/customerDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditComponent {
  formCustomer: FormGroup;
  tituloAccion: string;
  botonAccion: string;

  identificationTypes = [
    { value: 1, text: 'RNC' },
    { value: 2, text: 'Cedula' }
  ];

  countries = [
    { value: 1, text: 'Republica Dominicana' },
    { value: 2, text: 'Puerto Rico' },
    { value: 3, text: 'Estados Unidos' },
    { value: 4, text: 'Cuba' },
    { value: 5, text: 'El Salvador' }
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    
    this.tituloAccion = data ? 'Editar' : 'Agregar';
    this.botonAccion = data ? 'Actualizar' : 'Crear';
    
    
    this.formCustomer = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      identificationType: ['', Validators.required],
      house: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
    if (this.data) {
      this.patchDataToForm(this.data);
    }
  }

  
  private patchDataToForm(data: any): void {
    this.formCustomer.patchValue({
      name: data.name,
      lastName: data.lastName,
      phone: data.phone,
      identificationNumber: data.identification.identificationNumber,
      identificationType: data.identification.identificationType,
      house: data.address.house,
      street: data.address.street,
      neighborhood: data.address.neighborhood,
      country: data.address.country
    });
  }

  addEditCustomer() {
    if (this.formCustomer.valid) {
      const customerData = this.formCustomer.value;
      
    
      
      const requestPayload: CustomerDTO = {
        AddressDTO: {
          IdPerson: 0,
          House: customerData.house,
          Street: customerData.street,
          Neighborhood: customerData.neighborhood,
          Country: customerData.country
        },
        
        
        IdentificationDTO: {
          IdentificationNumber: customerData.identificationNumber,
          IdPerson: 0,
          IdentificationType: Number(customerData.identificationType)
        },
        PersonDTO: {
          IdPerson: 0,
          Name: customerData.name,
          LastName: customerData.lastName,
          Phone: customerData.phone
        },
        IdGeneralDTO: {
          IdPerson: 0
        }
      };
      if(this.data){
        requestPayload.IdGeneralDTO.IdPerson = this.data.id
    }

      if(requestPayload.IdGeneralDTO.IdPerson == 0){
        this.customerService.createCustomer(requestPayload).subscribe(
          (response: HttpResponse<string>) => {
            const statusCode = response.status;
            
            if (statusCode === 200) {
              this.snackBar.open("Cliente creado con éxito", 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'start',
                verticalPosition: 'bottom'
              });
              this.dialogRef.close({ resultado: 'create', data: response.body });
            } else {
              this.snackBar.open('Error al crear el cliente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'start',
                verticalPosition: 'bottom'
              });
            }
          },
          (error) => {
            if (error.status === 409) {
              this.snackBar.open('Ya existe un cliente con el número de identificación proporcionado.', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'start',
                verticalPosition: 'bottom'
              });
            } else {
              console.error('Error al crear el cliente:', error);
              this.snackBar.open('Error al crear el cliente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'start',
                verticalPosition: 'bottom'
              });
            }
          }
        );
        
    }else{
      this.customerService.updateCustomer(this.data.id, requestPayload).subscribe(
        (response: HttpResponse<string>) => {
          const statusCode = response.status;
          if (statusCode === 200) {
            this.snackBar.open("Cliente actualizado con éxito", 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'start',
              verticalPosition: 'bottom'
            });
            this.dialogRef.close({ resultado: 'create', data: response.body });
          } else {
            this.snackBar.open('Error al editar el cliente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'start',
              verticalPosition: 'bottom'
            });
          }
        },
        (error) => {
          console.error('Error al editar el cliente:', error);
          this.snackBar.open('Error al editar el cliente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom'
          });
        }
      );
    }
    
  }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
