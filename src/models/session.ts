import * as mongoose from 'mongoose';

export const SessionSchema =  new mongoose.Schema({
    sessionId:{
        type:String,
    },
    username:{
        type:String,
    },
    loggedInAt:{
        type:Date,
        default:Date.now(),
        expires:60 * 60 *24
    },
    expiresAt: {
        type:Date,
    }
})
