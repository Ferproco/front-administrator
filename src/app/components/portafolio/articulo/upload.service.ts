import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL: string = "/Imagenes";
	constructor(private httpClient: HttpClient)
  { }

  public upload(formData) {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      headers: httpHeaders,
      reportProgress: true,
        observe: 'events'
      });
  }

}
