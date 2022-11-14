import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/shared/services/crud/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm = new FormGroup({
    content: new FormControl(''),
    photoUrl: new FormControl('')
  })
  private currentUser: User = JSON.parse(localStorage.getItem('user'));
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const newPost: Post = new Post({
      content: this.postForm.value.content,
      photoUrl: this.postForm.value.photoUrl,
      createdBy: this.currentUser.id,
    })
    this.postsService.create(newPost)
    .then(() => {
      console.log('succsess')
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
