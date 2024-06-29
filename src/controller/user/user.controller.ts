import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserService } from 'src/service/user/user.service';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('active')
    async findActiveUsers(): Promise<User[]> {
        return this.userService.findActiveUsers();
    }

    @Get('active/pagination')
    async findActiveUsersWithPagination(@Query('page') page: number, @Query('limit') limit: number): Promise<User[]> {
        return this.userService.findActiveUsersWithPagination(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Get('active/:id')
    async findActiveUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findActiveUserById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }
}