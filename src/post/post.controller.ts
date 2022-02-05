import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @Get('/')
    AllPost() {
        return this.postService.findAll();
    }

    @Get('/:id')
    onePost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.findOne(+id);
    }

    @Get('DC')
    @HttpCode(HttpStatus.GONE)
    getDeprecate() {
        return `its a deprecate request pls change it!`
    }

    @Get('/get')
    getbyRes(@Res() res) {
        res.status(HttpStatus.GONE).send('get by @Res')
    }

    @Post()
    newPost(@Body() body: CreatePostDto) {
        return this.postService.create(body)
    }

    @Put()
    updatePost(@Param('id') id, @Body() body: UpdatePostDto) {
        return this.postService.update(+id, body)
    }

    @Patch()
    editPost(@Param('id') id, @Body() body: UpdatePostDto) {
        return this.postService.update(+id, body)
    }

    @Delete()
    deletePost(@Param('id') id) {
        return this.postService.delete(+id);
    }
}
