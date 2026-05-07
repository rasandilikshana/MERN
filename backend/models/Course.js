import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    instructor: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);