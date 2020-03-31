import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { CommondialogComponent } from '../commondialog/commondialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  allUsers: any;
  allGroups: any;
  currentChat: any;
  currentUser: any;
  chats = [];
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.currentUser = JSON.parse(this.authService.getToken());
    this.userService.Connectsocket(this.currentUser);
    this.chatForm = this.formBuilder.group({
      message: [null],
    });
    this.userService.getAllUsers().subscribe(data => {
      this.allUsers = data;
      console.log(this.allUsers);
      this.getGroups();
    }, err => {
      this.spinner.hide();
    });
    this.userService.newMessage().subscribe((data: any) => {
      if (this.currentChat) {
        console.log('New Message', data);
        const senderid = data.senderid ? data.senderid._id : null;
        const recieverid = data.recieverid ? data.recieverid._id : null;
        const groupid = data.groupid ? data.groupid._id : null;
        const chatid = this.currentChat ? this.currentChat._id : null;
        const userid = this.currentUser._id;
        console.log(chatid, senderid, senderid, userid, groupid);
        console.log((chatid === senderid) && (userid === recieverid));
        console.log((chatid === recieverid) && (userid === senderid));
        if (
          ((chatid === senderid) && (userid === recieverid)) ||
          ((chatid === recieverid) && (userid === senderid)) ||
          (chatid === groupid)
        ) {
          this.chats.push(data);
          this.chats = _.uniqBy(this.chats, '_id');
          this.chats.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
          const objDiv = document.getElementById('chat');
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      }
    });
  }

  getGroups() {
    this.userService.getAllGroups(this.currentUser._id).subscribe(data => {
      this.allGroups = data;
      console.log(this.allGroups);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }
  /**
   *
   * To send message
   */
  sendMessage() {
    console.log(this.chatForm.value);
    if (this.chatForm.value.message && this.chatForm.value.message.length) {
      this.spinner.show();
      console.log(this.chatForm.value);
      const obj = {
        message: this.chatForm.value.message,
        recieverid: this.currentChat.role === 'user' ? this.currentChat._id : null,
        groupid: this.currentChat.role !== 'user' ? this.currentChat._id : null,
        active: Boolean
      };
      this.userService.sendMessage(obj).subscribe(data => {
        this.spinner.hide();
        const objDiv = document.getElementById('chat');
        objDiv.scrollTop = objDiv.scrollHeight;
        this.chatForm.setValue({message: null });
      }, err => {
        this.spinner.hide();
      });
    }
  }
  getChat(i) {
    this.spinner.show();
    this.currentChat = i;
    this.userService.getChats(i._id).subscribe((data: any) => {
      this.chats = data;
      this.chats.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
      console.log(this.chats);
      setTimeout(() => {
        const objDiv = document.getElementById('chat');
        objDiv.scrollTop = objDiv.scrollHeight;
      });
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  openModel() {
    const dialogRef = this.dialog.open(CommondialogComponent, {
      width: '500px',
      height: '350px',
      data: this.allUsers
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if (result) {
        result.created_by = this.currentUser._id;
        const currUser = this.allUsers.find(x => x._id === this.currentUser._id);
        result.users.push(currUser);
        this.spinner.show();
        this.userService.createGroup(result).subscribe(data => {
          this.getGroups();
        }, err => {
          this.spinner.hide();
        });
      }
    });
  }
  logOut() {
    this.authService.logout();
  }
}
