import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
    private posts: PostEntity[] = [{
        id: 1,
        title: 'Reza',
        content: 'hi Reza',
        location: 'Mashhad',
        categories: ['person'] 
    }]

    findAll(){
        return this.posts
    }

    findOne(id: number){
        return this.posts.find(x=>x.id === id)
    }

    create(body: CreatePostDto){
        const post = new PostEntity();
        post.id = this.posts.length + 1;
        this.posts.push(post)

        return body
    }

    update(id: number, body: UpdatePostDto){
        const post = this.findOne(id)
        if(!post){
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
        }
        if(post.title){
            post.title = body.title;
        }
        if(post.content){
            post.content = body.content;
        }
        if(post.location){
            post.location = body.location;
        }
        if(post.categories){
            post.categories = body.categories;
        }

        return post
    }

    delete(id: number){
        const index = this.posts.findIndex(x=>x.id === id);
        if(index <= 0){
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
        }
        const post = this.posts[index]
        this.posts.splice(index, 1)

        return post
    }
}
