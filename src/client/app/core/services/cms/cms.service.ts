import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CMSData } from '../../../shared/cms';

@Injectable()
export class CMSService {

  constructor(private http: HttpClient) { }

  getCMSData(cmsID: string) {
    return this.http.get<CMSData>(`${environment.server}/v1/cms/${cmsID}`);
  }

}
