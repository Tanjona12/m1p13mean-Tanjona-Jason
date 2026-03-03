import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private API_URL = 'http://localhost:8080/api/client';

  constructor(private http: HttpClient) {}


  updateClient(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/updateClient/${id}`, data);
  }
}