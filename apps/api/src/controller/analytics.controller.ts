import { Request, Response } from "express";
import { AnalyticsService } from "../services/analytics.service";
import asyncHandler from "../utils/asyncHandler";

const analyticsService = new AnalyticsService();

export const getUserAnalytics = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const analytics = await analyticsService.getUserAnalytics(userId);
    
    res.json({
      success: true,
      message: "User analytics retrieved successfully",
      data: analytics,
    });
  } catch (error: any) {
    console.error('Get user analytics error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const getMediaAnalytics = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { mediaId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const analytics = await analyticsService.getMediaAnalytics(userId, mediaId);
    
    res.json({
      success: true,
      message: "Media analytics retrieved successfully",
      data: analytics,
    });
  } catch (error: any) {
    console.error('Get media analytics error:', error);
    if (error.message === 'Media not found' || error.message === 'Unauthorized access') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const likeMedia = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { mediaId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const result = await analyticsService.likeMedia(userId, mediaId);
    
    res.json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error: any) {
    console.error('Like media error:', error);
    if (error.message === 'Media not found') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const purchaseMedia = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { mediaId } = req.params;
    const { buyerEmail, buyerName, paymentId } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const result = await analyticsService.purchaseMedia(userId, mediaId, {
      buyerEmail,
      buyerName,
      paymentId,
    });
    
    res.json({
      success: true,
      message: "Media purchased successfully",
      data: result,
    });
  } catch (error: any) {
    console.error('Purchase media error:', error);
    if (error.message === 'Media not found' || error.message === 'Media not available for purchase') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

export const getUserEarnings = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const earnings = await analyticsService.getUserEarnings(userId);
    
    res.json({
      success: true,
      message: "User earnings retrieved successfully",
      data: earnings,
    });
  } catch (error: any) {
    console.error('Get user earnings error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const requestWithdrawal = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { amount, bankDetails } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const result = await analyticsService.requestWithdrawal(userId, amount, bankDetails);
    
    res.json({
      success: true,
      message: "Withdrawal request submitted successfully",
      data: result,
    });
  } catch (error: any) {
    console.error('Request withdrawal error:', error);
    if (error.message === 'Insufficient balance' || error.message === 'Invalid amount') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});
