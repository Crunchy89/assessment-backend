import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
    @Prop()
    name?: string;

    @Prop()
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
    next();
});