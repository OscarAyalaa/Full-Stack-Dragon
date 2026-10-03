import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, password: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, {username, password});
  }

  login(username: string, password: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, {username, password});
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean{
    return !!localStorage.getItem('token');
  }
}
