import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserResponse } from '../login/login.service';

export interface Video {
    id?: number;
    orderNumber: number;
    docName: string;
    docType: string;
    driveId: string;
    productTiersAppliedTo: string[];
}

export interface Prices {
  id?: number;
  beginner: number;
  intermediate: number;
  elite: number;
  consulting: number;
  annualPrices: string[];
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

  updateOrdersOnVideos(videos: Video[]): Observable<void> {
    return this.http.put<void>(`${environment.apiServer}/videos/update-order`, videos);
  }

  removeVideo(videoId: number): Observable<any> {
    return this.http.delete<void>(`${environment.apiServer}/videos/delete/id/${videoId}`);
  }

  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.apiServer}/videos/retrieve-all`);
  }

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${environment.apiServer}/users`);
  }

  updatePricing(prices: Prices): Observable<Prices> {
    return this.http.post<Prices>(`${environment.apiServer}/pricing`, prices);
  }

  removeUsersPlan(id: string) {
    return this.http.put<void>(`${environment.apiServer}/remove-plan/${id}`, {});
  }

}
