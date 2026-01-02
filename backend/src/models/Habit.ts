import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const HabitSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model<IHabit>("Habit",HabitSchema)