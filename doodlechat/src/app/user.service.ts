import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { FrontEndConfig } from './frontEndConfig';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  serverUrl: any;
  observer: any;
  socketio: Socket;
  constructor(
    public http: HttpClient,
    public backendUrl: FrontEndConfig
    ) {
      this.serverUrl = this.backendUrl.getserverurl();
    }

  /**
   * @param data
   * To get Chat
   */
  getChats(data) {
    return this.http.get(this.serverUrl + '/api/chats/getchat/' + data);
  }
  /**
   * To get All users
   */
  getAllUsers() {
    return this.http.get(this.serverUrl + '/api/users/all/user');
  }

  /**
   * @param id
   * To get all group
   */
  getAllGroups(id) {
    return this.http.get(this.serverUrl + '/api/groups/' + id);
  }

 /**
  * @param form
  * To add user
  */
  addUser(form) {
    return this.http.post(this.serverUrl + '/api/users' , form);
  }

  /**
   * @param form
   * To login user
   */
  loginUser(form) {
    return this.http.post(this.serverUrl + '/auth/local/' , form);
  }

  /**
   * @param message
   * To send message
   */
  sendMessage(message) {
    return this.http.post(this.serverUrl + '/api/chats' , message);
  }

  /**
   * @param users
   * To create group
   */
  createGroup(users) {
    return this.http.post(this.serverUrl + '/api/groups' , users);
  }

  /**
   * To get new message
   */
  newMessage() {
    const observable = new Observable<any>(observer => {
      this.socketio.on('chat:save', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  // Socket connection
  Connectsocket(type): Observable<number> {
    this.observer = new Observable();
    if (type.type === 'connect') {
      this.socketio = socketIo(this.serverUrl);
      this.socketio.emit('info', type.email);
    }
    if (type.type === 'disconnect') {
      this.socketio.emit('onDisconnect', '');
    }
    return this.createObservable();
  }
  // create an observerable
  createObservable(): Observable<number> {
    return new Observable<number>(observer => {
      this.observer = observer;
    });
  }
}
export interface Socket {
  _callbacks: any;
  on(event: string, callback: (data: any) => void );
  emit(event: string, data: any);
  disconnect();
  removeAllListeners(event: string);
}
