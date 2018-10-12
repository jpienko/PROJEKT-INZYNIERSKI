import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {
public activeChild:number;

  constructor(public http: HttpClient) {
    console.log('Hello GlobalsProvider Provider');
  }

}
