import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-commondialog',
  templateUrl: './commondialog.component.html',
  styleUrls: ['./commondialog.component.css'],
})
export class CommondialogComponent implements OnInit {
  allUsers: any;
  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<CommondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.allUsers = [...data];
    const currentUser = JSON.parse(this.authService.getToken());
    const index = this.allUsers.find((o, i) => {
      if (o._id === currentUser._id) {
        return i;
      }
    });
    this.allUsers.splice(index, 1);
   }

  ngOnInit(): void {

  }

  addGrp(form) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    }
  }
}
