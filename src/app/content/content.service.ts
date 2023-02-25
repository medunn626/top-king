import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Video {
    id?: number;
    docName: string;
    docType: string;
    driveId: string;
    driveSourceLink: string;
    productTiersAppliedTo: string[];
}

@Injectable()
export class ContentService {

  constructor(
    private http: HttpClient
  ) { }


  getVideosForTier(tier: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiServer}/videos/retrieve/${tier}`);
  }

}
