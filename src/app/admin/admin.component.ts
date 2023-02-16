import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminService, Video } from './admin.service';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { ModifyVideoDialog } from './modify-video-dialog/modify-video-dialog.component';
import { UserResponse } from '../login/login.service';

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
  notificationMethod = '';

  constructor(
    public dialog: MatDialog,
    private readonly adminService: AdminService
  ){}

  ngOnInit(): void {
    this.getVideos();
    this.getUsers();
  }

  updateFile(event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
  }

  updateTiers(stringValue: string) {
    this.videoTiers = stringValue;
  }

  updateNotificationMethods(stringValue: string) {
    this.notificationMethod = stringValue;
  }

  uploadVideo() {
    if (this.videoTiers && 
        this.notificationMethod && 
        this.videoName &&
        this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      this.adminService.uploadVideo(formData, this.videoTiers, this.videoName, this.notificationMethod)
      .subscribe(
        () => this.getVideos(),
        () => this.addFailure = true
      )
    }
  }

  getVideos() {
    this.adminService.getAllVideos().subscribe(
      (videos) =>  {
        this.videos = videos;
        this.videoDataSource = new MatTableDataSource(this.videos);
      },
      () => this.getFailure = true
    );
  }

  getUsers() {
    this.adminService.getAllUsers().subscribe(
      (users) =>  {
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
            () => this.getVideos(),
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
            () => this.getVideos(),
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
            () => this.getVideos(), 
            () => this.maintenanceFailure = true
          );
        }
      });
    }
  }

}
