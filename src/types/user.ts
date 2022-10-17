import { Document } from "mongoose"

export  interface User extends Document  {
   username:string,
   password:string
}

export interface T extends Document {
   username:string,
   loggedInAt:string,
   expiresAt:string
}