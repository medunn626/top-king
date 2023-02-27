import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService, Video } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  data = <any>{};
  tierToImgSrc: Map<string, string> = new Map([
    ['1', '/assets/beginner.png'],
    ['2', '/assets/int.png'],
    ['3', '/assets/elite.jpg'],
    ['admin', '/assets/elite.jpg']
  ]);
  usersCurrentPlan = '';
  allVideos: Video[];
  userAccessVideos: Video[];
  videoGroups: Video[][] = [];
  groupThreshold = 3;
  latestUserHiddenVideo: Video;
  getVideosFailure = false;
  smallerScreen = false;
  
  constructor(
    public router: Router,
    private readonly contentService: ContentService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('userId')) {
      this.router.navigate(['/']);
    }
    this.usersCurrentPlan = localStorage.getItem('productTier') ?? '';
    this.loadVideoData();
    this.onResize();
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
    this.setupVideoGroups();
    const userHiddenVideos = this.allVideos.filter(vid => !vid.productTiersAppliedTo.includes(this.usersCurrentPlan));
    this.latestUserHiddenVideo = userHiddenVideos[userHiddenVideos.length - 1];
  }

  private setupVideoGroups(): void {
    const numberOfGroups: number = Math.ceil(this.userAccessVideos.length / this.groupThreshold);
    for (let i = 1; i <= numberOfGroups; i++) {
      const max: number = i * this.groupThreshold;
      const min: number = (max - this.groupThreshold) + 1;
      const filteredVideos: Video[]  = this.userAccessVideos.slice(min -1, max);
      this.videoGroups.push(filteredVideos);
    }
  }


  @HostListener('window:resize')
  onResize() {
    this.smallerScreen = window.innerWidth < 900;
  }

}
