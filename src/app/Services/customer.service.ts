import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../Interfaces/customer';
import { CustomerDTO } from '../DTOs/customerDTO';
import { environment } from 'src/environments/environment.development';
import { CustomerDisplayDTO } from '../DTOs/customer-displayDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private endpoint: string = environment.endpoint;

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  getCustomers(): Observable<CustomerDisplayDTO[]> {
    return this.http.get<CustomerDisplayDTO[]>(`${this.endpoint}Customer`);
  }

  // Crear un nuevo cliente
  createCustomer(customer: CustomerDTO): Observable<HttpResponse<string>> {
    return this.http.post<string>(`${this.endpoint}Customer`, customer, { observe: 'response', responseType: 'text' as 'json' });
}


  // Actualizar un cliente existente
  updateCustomer(id: number, customer: CustomerDTO): Observable<HttpResponse<string>> {
    return this.http.put<string>(`${this.endpoint}Customer/${id}`, customer, { observe: 'response', responseType: 'text' as 'json' });
  }

  // Eliminar un cliente por ID
  deleteCustomer(id: number): Observable<HttpResponse<boolean>> {
    return this.http.delete<HttpResponse<boolean>>(`${this.endpoint}Customer/${id}`);
  }

  // Obtener un cliente por ID
  getCustomerById(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.endpoint}Customer/${id}`);
  }
}
