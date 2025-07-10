import mongoose, { Document, Schema } from 'mongoose';

export interface IWaitlist extends Document {
  email: string;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster email lookups
WaitlistSchema.index({ email: 1 });

// Index for sorting by creation date
WaitlistSchema.index({ createdAt: -1 });

export const Waitlist = mongoose.model<IWaitlist>('Waitlist', WaitlistSchema); 