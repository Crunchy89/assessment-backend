"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findActiveUsers() {
        return this.userModel.find({ isDeleted: false }).exec();
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return user;
    }
    async findActiveUserById(id) {
        const user = await this.userModel.findOne({ _id: id, isDeleted: false }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`Active user #${id} not found`);
        }
        return user;
    }
    async findActiveUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email, isDeleted: false }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`Active user #${email} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return updatedUser;
    }
    async updateName(id, updateNameUserDto) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, { name: updateNameUserDto.name }, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return updatedUser;
    }
    async updatePassword(id, newPassword) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, { password: newPassword }, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return updatedUser;
    }
    async delete(id) {
        const deletedUser = await this.userModel
            .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
            .exec();
        if (!deletedUser) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        return deletedUser;
    }
    async findActiveUsersWithPagination(page, limit) {
        const skip = (page - 1) * limit;
        return this.userModel.find({ isDeleted: false }, { password: 0, isDeleted: 0 }).skip(skip).limit(limit).exec();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map