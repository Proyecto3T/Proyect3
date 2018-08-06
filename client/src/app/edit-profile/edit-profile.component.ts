import { Component, OnInit } from '@angular/core';
import { FileUploader } from '../../../node_modules/ng2-file-upload';
import { Router } from '../../../node_modules/@angular/router';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private router:Router) { }

  uploader: FileUploader= new FileUploader({
    url: `http://localhost:3000/api/profiles/update`,
    method: 'POST'
  });
  
  edit(description){
   this.uploader.onBuildItemForm = (item, form) => {
      form.append('description', description);
    };
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = () => {
      this.router.navigate(['/profile']);
    };
  }
  ngOnInit() {
  }

}
