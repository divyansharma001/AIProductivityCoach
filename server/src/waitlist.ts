import { WaitlistResponse, WaitlistCountResponse } from './types';
import { Waitlist, IWaitlist } from './models/Waitlist';

class WaitlistService {
  async addToWaitlist(email: string): Promise<WaitlistResponse> {
    try {
      // Check if email already exists
      const existingEntry = await Waitlist.findOne({ email: email.toLowerCase() });
      
      if (existingEntry) {
        const totalCount = await Waitlist.countDocuments();
        return {
          success: false,
          message: 'Email already exists in waitlist',
          totalCount
        };
      }

      // Create new entry
      const newEntry = new Waitlist({
        email: email.toLowerCase()
      });

      await newEntry.save();

      // Get updated count
      const totalCount = await Waitlist.countDocuments();

      return {
        success: true,
        message: 'Successfully added to waitlist',
        totalCount
      };
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      throw error;
    }
  }

  async getWaitlistCount(): Promise<WaitlistCountResponse> {
    try {
      const count = await Waitlist.countDocuments();
      return {
        success: true,
        count
      };
    } catch (error) {
      console.error('Error getting waitlist count:', error);
      throw error;
    }
  }

  async getAllEntries(): Promise<IWaitlist[]> {
    try {
      const entries = await Waitlist.find()
        .sort({ createdAt: -1 })
        .select('email createdAt');
      return entries;
    } catch (error) {
      console.error('Error getting waitlist entries:', error);
      throw error;
    }
  }
}

export const waitlistService = new WaitlistService(); 