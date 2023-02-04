import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Video {
    id?: number;
    docName: string;
    docType: string;
    data: any;
    productTiersAppliedTo: string[];
}

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  uploadVideo(file: any, tiers: string, name: string, method: string): Observable<any> {
    return this.http.post<void>(`${environment.apiServer}/videos/upload/tiers/${tiers}/name/${name}/notify/${method}`, file);
  }

  updateTiersOnVideo(videoId: number, tiers: string): Observable<any> {
    return this.http.put<void>(`${environment.apiServer}/videos/update/id/${videoId}/tiers/${tiers}`, {});
  }

  updateVideoName(videoId: number, name: string): Observable<any> {
    return this.http.put<void>(`${environment.apiServer}/videos/update/id/${videoId}/name/${name}`, {});
  }

  removeVideo(videoId: number): Observable<any> {
    return this.http.delete<void>(`${environment.apiServer}/videos/delete/id/${videoId}`);
  }

  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiServer}/videos/retrieve/admin`);
  }

}
