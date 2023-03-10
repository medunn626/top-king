import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminService, Prices, Video } from './admin.service';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { ModifyVideoDialog } from './modify-video-dialog/modify-video-dialog.component';
import { UserResponse } from '../login/login.service';
import { Router } from '@angular/router';
import { PackagesService } from '../packages/packages.service';
import { EMPTY } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AccountService } from '../account/account.service';

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
    'orderNumber',
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
  prices: Prices;

  constructor(
    public dialog: MatDialog,
    private readonly adminService: AdminService,
    private readonly packagesService: PackagesService,
    private router: Router
  ){}

  ngOnInit(): void {
    if (!localStorage.getItem('userId') && localStorage.getItem('productTier') !== 'admin') {
      this.router.navigate(['/']);
    }
    this.getVideos();
    this.getUsers();
    this.getPricing();
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
        this.videos = videos.sort((vid1, vid2) => vid1.orderNumber - vid2.orderNumber);
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

  removePlanFromUser(userId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.componentInstance.confirmMessage = `Please confirm you would like to remove this user's plan`;
    dialogRef.afterClosed().subscribe(result => {
      if (result && userId) {
        this.adminService.removeUsersPlan(userId)
        .subscribe(
          () => {
            this.getFailure = false;
            this.getUsers();
          },
          () => this.getFailure = true
        );
      }
    });
  }

  getFriendlyTierNames(result: string | string[] | number) {
    if (typeof result !== 'string' && typeof result !== 'number') {
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

  reorderVideos(event: CdkDragDrop<Video>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
      const startingIndex = +this.videos.map(vid => vid.orderNumber).sort()[0];
      const reorderedVideos: Video[] = [];
      for (let i = 0; i < this.videos.length; i++) {
        const vid = {
          ...this.videos[i],
          orderNumber: startingIndex + i
        }
        reorderedVideos.push(vid);
      }
      this.adminService.updateOrdersOnVideos(reorderedVideos)
      .subscribe(
        () => {
          this.maintenanceFailure = false;
          this.getVideos();
        },
        () => this.maintenanceFailure = true
      );
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

  makeAnnual(checked: boolean, plan: string) {
    if (checked) {
      this.prices.annualPrices.push(plan);
    } else {
      const index = this.prices.annualPrices.findIndex(el => plan === el);
      this.prices.annualPrices.splice(index, 1);
    }
  }

  getPricing() {
    this.packagesService.getPrices()
    .subscribe(
      (prices) => {
        this.prices = prices;
        localStorage.setItem('beginnerPrice', '' + prices.beginner);
        localStorage.setItem('intermediatePrice', '' +  prices.intermediate);
        localStorage.setItem('elitePrice', '' + prices.elite);
        localStorage.setItem('consultingPrice', '' +  prices.consulting);
        localStorage.setItem('annualPrices', '' + prices.annualPrices)
      },
      () => EMPTY
    );
  }

  updatePricing() {
    if(this.prices.beginner ||
      this.prices.intermediate ||
      this.prices.elite ||
      this.prices.consulting) {
        this.adminService.updatePricing(this.prices)
        .subscribe(
          (updatedPrices) => {
            localStorage.setItem('beginnerPrice', '' + updatedPrices.beginner);
            localStorage.setItem('intermediatePrice', '' +  updatedPrices.intermediate);
            localStorage.setItem('elitePrice', '' + updatedPrices.elite);
            localStorage.setItem('consultingPrice', '' +  updatedPrices.consulting);
            localStorage.setItem('annualPrices', '' +  updatedPrices.annualPrices);
            this.pricesFailure = false;
            this.router.navigate(['plans']);
          },
          () => this.pricesFailure = true
        )

      }
  }

}
