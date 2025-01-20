import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private  readonly kaggleUrl = 'http://localhost:5000/students'; 
  private  readonly QuestionnaireUrl = 'assets/exemple2.json'; //à changer avec le vrai lien

  constructor(private http: HttpClient) {}

  getStudentData(): Observable<any[]> {
    return this.http.get<any[]>(this.kaggleUrl);
  }

  getStudentDataQuestionnaire(): Observable<any[]> {
    return this.http.get<any[]>(this.QuestionnaireUrl);
  }
}