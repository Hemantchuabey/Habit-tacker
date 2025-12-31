import mongoose, {Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document{
    email : string,
    password :string,
    name :string,
    comparePassword(candidatePassword:string):Promise<boolean>
}

const UserSchema:Schema = new Schema({
    email : {
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        select:false
    },
    name:{
        type:String,
        required:true,
        trim:true
    }
},
{
    timestamps:true
})


UserSchema.pre<IUser>('save', async function() {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
  } catch (error: any) {
    console.error("Error hasing password : ",error)
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);