import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = Document & User;

@Schema()
export class User {

    @Prop({ unique: true })
    email: string;

    @Prop()
    password?: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook to update 'updatedAt' on every save
UserSchema.pre<UserDocument>('save', async function (next) {
    this.updatedAt = new Date();

    // Encrypt password before saving
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }

    next();
});
