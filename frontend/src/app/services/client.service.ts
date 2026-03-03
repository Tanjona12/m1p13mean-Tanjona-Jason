import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private API_URL = `${environment.apiBaseUrl}/api/client`;


  constructor(private http: HttpClient) {}


  updateClient(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/updateClient/${id}`, data);
  }
}