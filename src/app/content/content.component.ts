import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService, Video } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  data = <any>{};
  usersCurrentPlan = '';
  allVideos: Video[];
  userAccessVideos: Video[];
  latestUserHiddenVideo: Video;
  getVideosFailure = false;
  
  constructor(
    public router: Router,
    private readonly contentService: ContentService
  ) { }

  ngOnInit() {
    this.usersCurrentPlan = localStorage.getItem('productTier') ?? '';
    this.loadVideoData();
  }


  private loadVideoData() {
    this.contentService.getVideosForTier('admin').subscribe(
      (videos) => {
        this.allVideos = videos;
        this.updateScreenData();
      },
      () => this.getVideosFailure = true);
  }

  private updateScreenData() {
    this.userAccessVideos = this.allVideos.filter(vid => vid.productTiersAppliedTo.includes(this.usersCurrentPlan));
    const userHiddenVideos = this.allVideos.filter(vid => !vid.productTiersAppliedTo.includes(this.usersCurrentPlan));
    this.latestUserHiddenVideo = userHiddenVideos[userHiddenVideos.length - 1];
  }

}
