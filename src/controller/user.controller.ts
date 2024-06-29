import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { CreateUserDto, UpdateNameUserDto, UpdatePasswordUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/service/user.service';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import * as bcrypt from 'bcrypt';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';


ApiTags('users')
@Controller('users')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        this.logger.log(`creating user with data ${JSON.stringify(createUserDto)}`);
        try {
            const result = await this.userService.create(createUserDto);
            this.logger.log(`created successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to create user : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @Get()
    async findAll(): Promise<User[]> {
        this.logger.log(`find all data`);
        try {
            const result = await this.userService.findAll();
            this.logger.log(`find successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to find data : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @Put('name/:id')
    async updateName(@Param('id') id: string, @Body() name: UpdateNameUserDto): Promise<User> {
        this.logger.log(`update name with data ${JSON.stringify(name)}`);
        try {
            const result = await this.userService.updateName(id, name);;
            this.logger.log(`find successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to update data : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @Put('password/:id')
    async updatePassword(@Param('id') id: string, @Body() updatePasswordUserDto: UpdatePasswordUserDto): Promise<User> {
        this.logger.log(`update password with data ${JSON.stringify(updatePasswordUserDto)}`);
        const { oldPassword, newPassword, retypePassword } = updatePasswordUserDto;

        // Check if old password and retype password match
        if (oldPassword !== retypePassword) {
            throw new BadRequestException('Old password and retype password do not match');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        try {
            const result = await this.userService.updatePassword(id, hashedPassword);
            this.logger.log(`update password successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to update password : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @Get('active')
    async findActiveUsers(): Promise<User[]> {
        this.logger.log(`find active users`);
        try {
            const result = await this.userService.findActiveUsers();
            this.logger.log(`find active users successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to find active users : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @Get('active/pagination')
    async findActiveUsersWithPagination(@Query('page') page: number, @Query('limit') limit: number): Promise<User[]> {
        this.logger.log(`find active users with pagination`);
        try {
            const result = await this.userService.findActiveUsersWithPagination(page, limit);
            this.logger.log(`find active users with pagination successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to find active users with pagination : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        this.logger.log(`find user with id ${id}`);
        try {
            const result = await this.userService.findOne(id);
            this.logger.log(`find user with id ${id} successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to find user with id ${id} : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @Get('active/:id')
    async findActiveUserById(@Param('id') id: string): Promise<User> {
        this.logger.log(`find active user with id ${id}`);
        try {
            const result = await this.userService.findActiveUserById(id);
            this.logger.log(`find active user with id ${id} successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to find active user with id ${id} : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("access-token")
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        this.logger.log(`delete user with id ${id}`);
        try {
            const result = await this.userService.delete(id);
            this.logger.log(`delete user with id ${id} successfully`);
            return result;
        } catch (error) {
            this.logger.error(`Failed to delete user with id ${id} : `, error.stack);
            throw error; // Rethrow the error to be handled by the global exception filter or a custom one
        }
    }
}