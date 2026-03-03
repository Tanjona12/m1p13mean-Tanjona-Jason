import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private API_URL = `${environment.apiBaseUrl}/api/admin`;
  
  constructor(private http: HttpClient) {}

  createBoutiqueUser(formData: FormData) {
    return this.http.post(`${this.API_URL}/createUser`, formData);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/getUsers`);
  }

  changeUserStatus(userId: string, isActive: boolean) {
    return this.http.put(`${this.API_URL}/changeStatusUser/${userId}`, { isActive });
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/getUser/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URL}/deleteUser/${id}`);
  }

  getBoutiqueUsers() {
    return this.http.get<any[]>(`${this.API_URL}/getBoutiqueUsers`);
  }

  createBoutique(data: FormData) {
    return this.http.post(`${this.API_URL}/createBoutique`, data)
  }

  getBoutiques(): Observable<any> {
    return this.http.get(`${this.API_URL}/getBoutiques`);
  }

  getBoutique(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/getBoutique/${id}`);
  }

  changeStatusBoutique(boutiqueId: string, isActive: boolean) {
    return this.http.put(`${this.API_URL}/changeStatusBoutique/${boutiqueId}`, { isActive });
  }

  deleteBoutique(id: string) {
    return this.http.delete(`${this.API_URL}/deleteBoutique/${id}`);
  }

}