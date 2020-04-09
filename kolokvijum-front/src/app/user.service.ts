import { Injectable } from '@angular/core';
import { User } from './users/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/auth/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched Users')),
        catchError(this.handleError('getUsers', []))
      );
  }
  get(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  editUser(id) {
    return this
            .http
            .get(`${this.apiUrl}/${id}`);
    }
    deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${id}`, { responseType: 'text' });
    }
  
  deleteAll() {
    return this.http.delete(this.apiUrl);
  }

  updateUser(fullname, email, id) {

    const obj = {
        fullname: fullname,
        email: email,
        
};
    this
      .http
      .put(`${this.apiUrl}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  getAllXsls()
  {
    return this.http.get(`${this.apiUrl}/download/users.xlsx`, {responseType: 'blob'} );
  }

  importUsers(path: string) {
    return this.http.post('http://localhost:8080/api/auth/users/importusers', path, {responseType: 'text'});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
