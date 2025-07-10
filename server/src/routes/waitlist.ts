import { Router, Request, Response } from 'express';
import { waitlistService } from '../waitlist';

const router = Router();

// Add email to waitlist
router.post('/join', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const result = await waitlistService.addToWaitlist(email);
    
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get waitlist count
router.get('/count', async (req: Request, res: Response) => {
  try {
    const result = await waitlistService.getWaitlistCount();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all waitlist entries (for admin purposes)
router.get('/entries', async (req: Request, res: Response) => {
  try {
    const entries = await waitlistService.getAllEntries();
    return res.status(200).json({
      success: true,
      entries,
      count: entries.length
    });
  } catch (error) {
    console.error('Error getting waitlist entries:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router; 