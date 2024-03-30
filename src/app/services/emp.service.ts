import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

const API_GET_EMPLOYEES = 'http://localhost:9090/employees/';
const API_ADMIN_EMPLOYEES = 'http://localhost:9090/admin/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EmpService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(API_GET_EMPLOYEES);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${API_GET_EMPLOYEES}${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_ADMIN_EMPLOYEES + 'create', data, {
      responseType: 'text' as 'json',
    });
  }

  update(id: string, data: any): Observable<string> {
    return this.http.put<string>(
      `${API_ADMIN_EMPLOYEES + 'update'}/${id}`,
      data,
      { responseType: 'text' as 'json' }
    );
  }
  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${API_ADMIN_EMPLOYEES + 'delete'}/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  getIntervals(page: string, size: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);
    return this.http.get<any>(
      API_GET_EMPLOYEES + 'paginator' + '?' + params.toString()
    );
  }
}
