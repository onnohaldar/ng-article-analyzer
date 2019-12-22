import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScholarService {

  constructor(private http: HttpClient) { }

  getLabels() {
    const labelsUrl = '/scholar/citations?view_op=manage_labels&hl=nl&oi=srp';

    return this.http.get(labelsUrl, {responseType: 'text'});
  }

}
