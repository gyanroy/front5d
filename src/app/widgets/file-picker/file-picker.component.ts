import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent implements OnInit {
  @Output() newFileEvent = new EventEmitter();
  @Input() fileInputId = 0;
  @Input() multipleSupport = true;
  allowedFileExtArr: string[] = ['jpg', 'jpeg', 'png'];
  fileTypeFilter: string[] = [
    'image/jpg', 
    'image/jpeg',
    'image/png'
  ];
  isFileDropping: boolean = false;
  isLoading: boolean = false;
  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  validateFile(file: any): boolean {
    let status = false;
    let fileType = file.type || file.mimeType || file.file?.mimeType;
    if (!fileType) {
      const fileext = file.name.split('.');
      fileType = fileext[fileext.length - 1];
    }
    const fileSize = file.size || 0;
    // size check not added yet
    const maxFileSize = '5mb';
    let maxSize = 0;
    if (maxFileSize) {
      const sizeSplit = [maxFileSize.substr(0, maxFileSize.length - 2), maxFileSize.substr(maxFileSize.length - 2, 2)];
      if (sizeSplit[1] === 'kb') {
        maxSize = parseInt(sizeSplit[0], 10) * 1024;
      } else if (sizeSplit[1] === 'mb') {
        maxSize = parseInt(sizeSplit[0], 10) * 1024 * 1024;
      }
    }
    const nameSplit = file.name.split('.');
    let fileExt = '';
    if (nameSplit.length) {
      fileExt = nameSplit[nameSplit.length - 1];
    };
    if (this.allowedFileExtArr.includes(fileExt) || this.fileTypeFilter.includes(fileType)) {
      if (maxSize) {
        if (fileSize > maxSize) {
          status = false;
          this.toastr.warning('Exceeded maximum upload size');
        } else {
          status = true;
        }
      }
    } else {
      this.toastr.warning('Unsupported file type: ' + fileExt);
    }

    return status;
  }

  dropListener(event: any): void {
    this.isFileDropping = false;
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (this.multipleSupport) {
      this.filePicker({ files });
    } else {
      if (files.length > 1) {
        this.toastr.warning("You can't upload multiple files");
      } else {
        this.filePicker({ files });

      }
    }
  }

  fileDropEvent(event: any, dropStatus: boolean): void {
    this.isFileDropping = dropStatus;
    event.preventDefault();
  }

  filePicker = (data: any) => {
    const emitFiles = [];
    console.log(data);
    for (const file of data.files) {
      if (this.validateFile(file)) {
        emitFiles.push(file);
      }
    }
    const fileInputElement: any = document.getElementById('attachment' + this.fileInputId);
    if (fileInputElement) {
      fileInputElement.value = '';
    }
    if (emitFiles.length) {
      this.newFileEvent.emit({ files: emitFiles });
    }
  }

  openFilePicker(): void {
    const fileInputElement = document.getElementById('attachment' + this.fileInputId);
    fileInputElement?.click();
  }

  getFile(event: any): void {
    const files = event.target.files;
    this.filePicker({ files });
  }
}
