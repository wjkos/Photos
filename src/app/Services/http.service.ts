import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  photosUrl = 'https://jsonplaceholder.typicode.com/photos';
  results;
  dataReceived = new Subject<void>(); // indicates to anyone interested that server responded

  // -------------------------------------------------------------------
  constructor(private http: HttpClient) {}
  // -------------------------------------------------------------------
  // simple
  // -------------------------------------------------------------------
  getPhotosData2() {
    this.http.get(this.photosUrl).subscribe(data => {
        this.results = data;
        this.dataReceived.next(); // announce that server responded
      }
    );
  }
  // -------------------------------------------------------------------
  // with error handling
  // -------------------------------------------------------------------
  getPhotosData() {
    this.http.get(this.photosUrl).subscribe({
        next: (data) => {
          this.results = data;
          this.dataReceived.next(); // announce that server responded
        },
        error: (message) => { console.log('Error: ', message);  },
        complete: () => { console.log('Complete'); }
      }
    );
  }
}
