import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Video {
  plansApplies: number[];
  title?: string;
  source?: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  usersCurrentPlan = 0;
  videos: Video[];
  userAccessVideos: Video[];
  latestUserHiddenVideo: Video;
  
  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    this.loadVideoData();
    this.usersCurrentPlan = +(localStorage.getItem('plan') ?? 0);
    this.userAccessVideos = this.videos.filter(vid => vid.plansApplies.includes(this.usersCurrentPlan));
    const userHiddenVideos = this.videos.filter(vid => !vid.plansApplies.includes(this.usersCurrentPlan));
    this.latestUserHiddenVideo = userHiddenVideos[userHiddenVideos.length - 1];
  }

  // Mock right now but would grab from a service 
  loadVideoData() {
    this.videos = [
      {
        title: 'Compeition',
        source: '/assets/competition.mp4',
        plansApplies: [1, 2, 3]
      },
      {
        title: 'Grocery Shopping',
        source: '/assets/grocery.mp4',
        plansApplies: [2, 3]
      },
      {
        title: 'Cheat Meal',
        source: '/assets/grocery.mp4',
        plansApplies: [3]
      },
      {
        title: 'Powerball',
        source: '/assets/powerball.mp4',
        plansApplies: [3]
      }
    ]
  }

}
