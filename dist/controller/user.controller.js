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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../dto/user.dto");
const user_service_1 = require("../service/user.service");
const auth_guard_1 = require("../auth/auth.guard");
const bcrypt = require("bcrypt");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async create(createUserDto) {
        this.logger.log(`creating user with data ${JSON.stringify(createUserDto)}`);
        try {
            const result = await this.userService.create(createUserDto);
            this.logger.log(`created successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to create user : `, error.stack);
            throw error;
        }
    }
    async findAll() {
        this.logger.log(`find all data`);
        try {
            const result = await this.userService.findAll();
            this.logger.log(`find successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to find data : `, error.stack);
            throw error;
        }
    }
    async updateName(id, name) {
        this.logger.log(`update name with data ${JSON.stringify(name)}`);
        try {
            const result = await this.userService.updateName(id, name);
            ;
            this.logger.log(`find successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to update data : `, error.stack);
            throw error;
        }
    }
    async updatePassword(id, updatePasswordUserDto) {
        this.logger.log(`update password with data ${JSON.stringify(updatePasswordUserDto)}`);
        const { oldPassword, newPassword, retypePassword } = updatePasswordUserDto;
        if (oldPassword !== retypePassword) {
            throw new common_1.BadRequestException('Old password and retype password do not match');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        try {
            const result = await this.userService.updatePassword(id, hashedPassword);
            this.logger.log(`update password successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to update password : `, error.stack);
            throw error;
        }
    }
    async findActiveUsers() {
        this.logger.log(`find active users`);
        try {
            const result = await this.userService.findActiveUsers();
            this.logger.log(`find active users successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to find active users : `, error.stack);
            throw error;
        }
    }
    async findActiveUsersWithPagination(page, limit) {
        this.logger.log(`find active users with pagination`);
        try {
            const result = await this.userService.findActiveUsersWithPagination(page, limit);
            this.logger.log(`find active users with pagination successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to find active users with pagination : `, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        this.logger.log(`find user with id ${id}`);
        try {
            const result = await this.userService.findOne(id);
            this.logger.log(`find user with id ${id} successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to find user with id ${id} : `, error.stack);
            throw error;
        }
    }
    async findActiveUserById(id) {
        this.logger.log(`find active user with id ${id}`);
        try {
            const result = await this.userService.findActiveUserById(id);
            this.logger.log(`find active user with id ${id} successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to find active user with id ${id} : `, error.stack);
            throw error;
        }
    }
    async delete(id) {
        this.logger.log(`delete user with id ${id}`);
        try {
            const result = await this.userService.delete(id);
            this.logger.log(`delete user with id ${id} successfully`);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to delete user with id ${id} : `, error.stack);
            throw error;
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('name/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateNameUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateName", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('password/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdatePasswordUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findActiveUsers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('active/pagination'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findActiveUsersWithPagination", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('active/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findActiveUserById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map