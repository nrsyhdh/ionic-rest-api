import { Component } from '@angular/core';
import { RemoteService } from '../services/remote.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  postList:any;

  constructor(public remoteService : RemoteService) {
    this.postList = [];
  }

  ionViewWillEnter(){
    this.getPosts();
  }

  getPosts(){
    this.remoteService.getPosts().subscribe((data) =>{
      this.postList = data;
    });
  }
}
