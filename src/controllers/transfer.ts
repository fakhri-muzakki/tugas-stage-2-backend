import { type Request, type Response, type NextFunction } from 'express';
import { transferPointService } from '../services/transfer';

interface TransferPointRequest {
  senderId: string;
  recipientId: string;
  amount: string;
}

export const transferPoint = async (
  req: Request<object, object, TransferPointRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { senderId, recipientId, amount } = req.body;
    const result = await transferPointService(
      Number(senderId),
      Number(recipientId),
      Number(amount)
    );

    return res.status(200).json({
      success: true,
      message: 'Point transferred successfully',
      data: {
        sender: {
          id: result.updatedSender.id,
          remainingPoint: result.updatedSender.point,
        },
        recipient: {
          id: result.updatedRecipient.id,
          currentPoint: result.updatedRecipient.point,
        },
        transfer: {
          amount: Number(amount),
          timestamp: new Date(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
