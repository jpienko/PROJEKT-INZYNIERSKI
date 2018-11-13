import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {
public activeChild:number;
public firstLaunch:boolean = true;

  constructor(public http: HttpClient) {
  }

}
