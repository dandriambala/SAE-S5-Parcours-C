import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  //private  readonly kaggleUrl = 'http://localhost:5000/students'; 
  private  readonly kaggleUrl = '../assets/dataset_kaggle.json'; 
  //private  readonly QuestionnaireUrl = 'http://localhost:5001/students2';
  private  readonly QuestionnaireUrl = '../assets/dataset_questionnaire.json';

  constructor(private http: HttpClient) {}

  getStudentData(): Observable<any[]> {
    return this.http.get<any[]>(this.kaggleUrl);
  }

  getStudentDataQuestionnaire(): Observable<any[]> {
    return this.http.get<any[]>(this.QuestionnaireUrl);
  }
}