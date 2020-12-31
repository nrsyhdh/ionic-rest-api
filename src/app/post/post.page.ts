import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { RemoteService } from '../services/remote.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  id:number;
  data:Post;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public remoteService: RemoteService
  ) { 
    this.data = new Post();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];

    this.remoteService.getOnePost(this.id).subscribe(response=>{
      this.data = response;
    })
  }

}
