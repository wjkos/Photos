import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {

  // Currently a very slim service. 
  // Possible enchancements - hold the sizes of the different components, etc.

  chosenPhotoRecord = null;
  

  constructor() { }
}
