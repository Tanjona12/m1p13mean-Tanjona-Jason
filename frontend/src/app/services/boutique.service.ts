import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {

  private API_URL = 'http://localhost:8080/api/boutique';

  constructor(private http: HttpClient) {}

  getBoutiqueOwner(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/getBoutiqueOwner`);
  }

  createProduit(data: FormData) {
    return this.http.post(`${this.API_URL}/createProduit`, data)
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/getMe`);
  }

  getProduitsBoutique(id: string) {
    return this.http.get<any>(`${this.API_URL}/getProduit/boutique/${id}`);
  }

  getProduits(): Observable<any> {
    return this.http.get(`${this.API_URL}/getProduits`);
  }

  getProduit(id: string) {
    return this.http.get<any>(`${this.API_URL}/getProduit/${id}`);
  }

  updateProduit(id: string, data: FormData): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/updateProduit/${id}`, data);
  }

  updateBoutique(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/updateBoutique/${id}`, data);
  }
}