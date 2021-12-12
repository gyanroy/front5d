import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  filesForUpload: any;
  selectedFiles: FileMetaData[] = []
  processFileCount: number = 0;
  uploader: string = '';
  allProcessedCount: number = 0;
  uploadingFiles: boolean = false;
  multipleSupport: boolean = false;
  menu = [
    {
      id: '1',
      name: 'Profile',
      switchVar: 'profile',
      isDefault: false,
      hasOwnView: true,
    },
    {
      id: '2',
      name: 'Moments',
      switchVar: 'moments',
      hasOwnView: false,
      isDefault: true,
      subitems: [
        {
          id: '1.1',
          name: 'Moment List',
          switchVar: 'moments-list',
          isDefault: true,
          hasOwnView: true
        },
        {
          id: '1.2',
          name: 'Moment List',
          switchVar: 'moments-list',
          isDefault: true,
          hasOwnView: true
        }
      ]

    }
  ]
  addNewStatus: boolean = true;
  removeUploads: boolean = false;


  userMoments: any[] = [];
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUserMoments();
  }

  async getUserMoments() {
    this.userMoments = await this.userService.getMoments() as any[];
  }


  emitProcessedFile(file: any): void {
    const fileData: FileMetaData = {
      file,
      isUploaded: false,
      error: '',
      uploadProgress: 0,
      allProcessed: this.filesForUpload.filter((fileItem: any) => !fileItem.processed).length === 0,
      uploadResponse: {},
      loaded: 0,
      total: file.size

    };

    if (fileData.allProcessed) {
      this.isLoading = false;
    }
    if (!this.multipleSupport) {
      this.selectedFiles = [];
      this.processFileCount = 0;
    }
    this.selectedFiles.push(fileData)
    // this.fileData.emit(fileData);
    this.uploadFile(fileData)

  }

  processFiles(files: any[]) {
    console.log(files);
  }

  processFile = (uploadFile: File) => {
    if (!uploadFile.type) {
      const namesplit = uploadFile.name.split('.');
      const fileExtension = namesplit[namesplit.length - 1];
      const fileType = uploadFile.type;
      uploadFile = new File([uploadFile], uploadFile.name, { type: fileType });
    }

    this.emitProcessedFile(uploadFile);
  }

  uploadFile(file: FileMetaData) {
    // console.log('file: ', file);
    // const formData = new FormData();
    // const uploadUrl = '/';
    // this.apiService.post5dApi(uploadUrl, formData)
    //   .then((event: any) => {
    //     switch (event.type) {

    //       case HttpEventType.Sent:
    //         console.log('Submitted!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         file.loaded = event.loaded;
    //         file.total = event.total
    //         file.uploadProgress = Math.round(event.loaded / event.total * 100);
    //         // console.log(`Uploaded! ${file.uploadProgress}%`);
    //         break;
    //       case HttpEventType.Response:
    //         this.processFileCount++;
    //         file.uploadResponse = event.body;
    //         file.isUploaded = true;
    //         if (this.processFileCount === this.allProcessedCount) {
    //           console.log('All files has been proccessed')
    //           this.uploadingFiles = false;
    //           // this.fileData.emit(this.selectedFiles)
    //           // update this condn to add uploaded files to new file
    //           // use some other variable than showActions for usage
    //           if (this.removeUploads) {
    //             this.selectedFiles = [];
    //           }
    //         }
    //     }
    //   }, err => {
    //     console.log('Error', err)
    //     this.processFileCount++;
    //     if (this.processFileCount === this.allProcessedCount) {
    //       console.log('All files has been proccessed')
    //       this.uploadingFiles = false;
    //       // this.fileData.emit(this.selectedFiles)
    //       // if (!this.showActions) {
    //       //   this.selectedFiles = [];
    //       // }
    //     }
    //     file.error = err.error?.message || 'Upload error'
    //     file.uploadProgress = 0;
    //     file.loaded = 0
    //     file.isUploaded = false;

    //   })
  }

  removeFile(i: number) {
    const removedFile = this.selectedFiles.splice(i, 1);

    if (removedFile[0].error && !removedFile[0].isUploaded) {
      return;
    }
    console.log(this.selectedFiles);
  }

  logout() {
    this.userService.logoutUser();
  }

}

type FileMetaData = {
  file: File,
  uploadProgress: number,
  isUploaded: boolean,
  error: string,
  allProcessed: boolean,
  uploadResponse: object,
  loaded: number,
  total: number
}