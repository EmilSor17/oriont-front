import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from './Services/customer.service';
import { DialogAddEditComponent } from './Modals/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Modals/dialog-delete/dialog-delete.component';
import { CustomerDisplayDTO } from './DTOs/customer-displayDTO';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'identification', 'address', 'actions'];
  dataSource = new MatTableDataSource<CustomerDisplayDTO>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  countries: { [key: number]: string } = {
    1: 'República Dominicana',
    2: 'Puerto Rico',
    3: 'Estados Unidos',
    4: 'Cuba',
    5: 'El Salvador'
  };

  constructor(private customerService: CustomerService,
              public dialog: MatDialog,
              private snackbar: MatSnackBar) {
    this.paginator = undefined;
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  openCreate() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {      
        this.getCustomers();      
    });
  }
  getCountryName(countryId: number): string {
    return this.countries[countryId] || 'Desconocido';
  }
  

  delete(customer: number) {
    
    this.dialog.open(DialogDeleteComponent, {
      disableClose: true,
      data: customer
    }).afterClosed().subscribe(resultado => {
      if (resultado === "deleted") {
        this.customerService.deleteCustomer(customer).subscribe(
          (response: HttpResponse<boolean>) => {            
            if (response) {
              this.snackbar.open("Cliente eliminado con éxito", 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'start',
                verticalPosition: 'bottom'
              });
              this.getCustomers();  
            } else {
              this.snackbar.open('Error al eliminar el cliente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'start',
                verticalPosition: 'bottom'
              });
            }
          },
          (error) => {
            console.error('Error al eliminar el cliente:', error);
            this.snackbar.open('Error al eliminar el cliente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'start',
              verticalPosition: 'bottom'
            });
          }
        );
      }
    });
  }

  alert(message: string, action: string) {
    this.snackbar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  openUpdate(customer: CustomerDisplayDTO) {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      data: customer
    }).afterClosed().subscribe(resultado => {
      
        this.getCustomers();
      
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.dataSource.data = data;        
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  
  
}
