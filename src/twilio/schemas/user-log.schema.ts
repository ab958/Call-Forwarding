import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// export type CatDocument = HydratedDocument<Template>;

@Schema({
    timestamps: true
})
export class UserOperationLog {
    @Prop({
        type: String,
    })
    caller?: number;

    @Prop({
        type: String,
    })
    callerCountry?: string;

    @Prop({
        type: Number,
    })
    userChoice?: number;

    @Prop({
        type: String,
        required: false
    })
    recordingUrl?: string;

    @Prop({
        type: String,
        required: false
    })
    errorMessage?: string;

}

export const UserOperationLogSchema = SchemaFactory.createForClass(UserOperationLog);