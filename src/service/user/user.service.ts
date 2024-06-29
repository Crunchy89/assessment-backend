import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { Model } from "mongoose";
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findActiveUsers(): Promise<User[]> {
        return this.userModel.find({ isDeleted: false }).exec();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    async findActiveUserById(id: string): Promise<User> {
        const user = await this.userModel.findOne({ _id: id, isDeleted: false }).exec();
        if (!user) {
            throw new NotFoundException(`Active user #${id} not found`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return updatedUser;
    }
    async delete(id: string): Promise<User> {
        const deletedUser = await this.userModel
            .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
            .exec();
        if (!deletedUser) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return deletedUser;
    }

    async findActiveUsersWithPagination(page: number, limit: number): Promise<User[]> {
        const skip = (page - 1) * limit;
        return this.userModel.find({ isDeleted: false }).skip(skip).limit(limit).exec();
    }

}
