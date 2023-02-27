import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminService, Video } from './admin.service';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { ModifyVideoDialog } from './modify-video-dialog/modify-video-dialog.component';
import { UserResponse } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  videoName: string;
  file: File;
  videos: Video[];
  videoTiers = '';
  users: UserResponse[];
  videoDisplayedColumns: string[] = [
    'docName',
    'productTiersAppliedTo'
  ];
  videoDataSource;
  userDisplayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'productTier'
  ];
  userDataSource;
  addFailure = false;
  getFailure = false;
  maintenanceFailure = false;
  pricesFailure = false;
  notificationMethod = 'N';
  loading = false;
  showVideoUpload = false;
  showVideoMaintenance = false;
  showUpdatePricing = false;
  showUsers = false;
  prices = <any>{};

  constructor(
    public dialog: MatDialog,
    private readonly adminService: AdminService,
    private router: Router
  ){}

  ngOnInit(): void {
    if (!localStorage.getItem('userId') && localStorage.getItem('productTier') !== 'admin') {
      this.router.navigate(['/']);
    }
    this.getVideos();
    this.getUsers();
  }

  toggleVideoUpload() {
    this.showVideoUpload = !this.showVideoUpload;
  }

  toggleVideoMaintenance() {
    this.showVideoMaintenance = !this.showVideoMaintenance;
  }

  toggleUpdatePricing() {
    this.showUpdatePricing = !this.showUpdatePricing;
  }

  toggleUsers() {
    this.showUsers = !this.showUsers;
  }

  updateFile(event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
  }

  updateTiers(stringValue: string) {
    this.videoTiers = stringValue;
  }

  updateNotificationMethods(sendEmail: boolean) {
    this.notificationMethod = sendEmail ? 'E'  : 'N';
  }

  uploadVideo() {
    if (this.videoTiers && 
        this.notificationMethod && 
        this.videoName &&
        this.file) {
      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.file);

      this.adminService.uploadVideo(formData, this.videoTiers, this.videoName, this.notificationMethod)
      .subscribe(
        () => {
          this.addFailure = false;
          this.getVideos();
          this.loading = false;
        },
        () => {
          this.addFailure = true
          this.loading = false;
        }
      )
    }
  }

  getVideos() {
    this.adminService.getAllVideos().subscribe(
      (videos) =>  {
        this.getFailure = false;
        this.videos = videos;
        this.videoDataSource = new MatTableDataSource(this.videos);
      },
      () => this.getFailure = true
    );
  }

  getUsers() {
    this.adminService.getAllUsers().subscribe(
      (users) =>  {
        this.getFailure = false;
        this.users = users;
        this.userDataSource = new MatTableDataSource(this.users);
      },
      () => this.getFailure = true
    );
  }

  getFriendlyTierNames(result: string | string[]) {
    if (typeof result !== 'string') {
      return result
      .filter(res => res !== 'admin')
      .map(res => {
        if (res === '1') {
          return 'BEG';
        } else if (res === '2') {
          return ' INT';
        } else if (res === '3') {
          return ' ELI';
        } else {
          return '';
        }
      });
    } 
    return result;
  }

  getFriendlyTierName(columnName: string, result: string) {
    if (columnName === 'productTier') {
      if (result === '1') {
        return 'Beginner';
      } else if (result === '2') {
        return ' Intermediate';
      } else if (result === '3') {
        return ' Elite';
      } else {
        return '';
      }
    }
    return result;
  }

  modifyVideo(columnName: string, video: Video) {
    if (columnName === 'docName') {
      this.modifyName(video);
    } else {
      this.modifyTier(video);
    }
  }

  private modifyTier(video: Video) {
    const id = video.id ?? 0;
    if (video.id !== undefined) {
      const dialogRef = this.dialog.open(ModifyVideoDialog, {
        disableClose: true,
        width: '75%'
      });
      dialogRef.componentInstance.videoName = video.docName;
      dialogRef.componentInstance.isUpdatingTier = true;
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.adminService.updateTiersOnVideo(id, result).subscribe(
            () => {
              this.maintenanceFailure = false;
              this.getVideos();
            },
            () => this.maintenanceFailure = true
          );
        }
      });
    }
  }

  private modifyName(video: Video) {
    const id = video.id ?? 0;
    if (video.id !== undefined) {
      const dialogRef = this.dialog.open(ModifyVideoDialog, {
        disableClose: true,
        width: '75%'
      });
      dialogRef.componentInstance.isUpdatingTier = false;
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.adminService.updateVideoName(id, result).subscribe(
            () => {
              this.maintenanceFailure = false;
              this.getVideos();
            },
            () => this.maintenanceFailure = true
          );
        }
      });
    }
  }

  deleteVideo(video: Video) {
    const id = video.id ?? 0;
    if (video.id !== undefined) {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        disableClose: true,
        width: '75%'
      });
      dialogRef.componentInstance.confirmMessage = 'Do you want to delete this video?';
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.adminService.removeVideo(id).subscribe(
            () => {
              this.maintenanceFailure = false;
              this.getVideos();
            },
            () => this.maintenanceFailure = true
          );
        }
      });
    }
  }

  updatePricing() {
    if(this.prices.beginner ||
      this.prices.intermediate ||
      this.prices.elite ||
      this.prices.consulting) {
        const updatedPrices = [
          this.prices.beginner ?? (localStorage.getItem('beginnerPrice') ?? '30'),
          this.prices.intermediate ?? (localStorage.getItem('intermediatePrice') ?? '50'),
          this.prices.elite ?? (localStorage.getItem('elitePrice') ?? '75'),
          this.prices.consulting ?? (localStorage.getItem('consultingPrice') ?? '100')
        ];
        this.adminService.updatePricing(updatedPrices)
        .subscribe(
          (updatedPrices) => {
            localStorage.setItem('beginnerPrice', '' + updatedPrices.beginner);
            localStorage.setItem('intermediatePrice', '' +  updatedPrices.intermediate);
            localStorage.setItem('elitePrice', '' + updatedPrices.elite);
            localStorage.setItem('consultingPrice', '' +  updatedPrices.consulting);
            this.pricesFailure = false;
            this.router.navigate(['plans']);
          },
          () => this.pricesFailure = true
        )

      }
  }

}
