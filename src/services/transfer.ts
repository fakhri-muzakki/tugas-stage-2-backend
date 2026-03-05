import { ERROR_CODES } from '../constants/errorCodes';
import { AppError } from '../errors/AppError';
import prisma from '../libs/prisma';

export const transferPointService = async (
  senderId: number,
  recipientId: number,
  amount: number
) => {
  // Cek apakah amout itu > 0
  if (amount < 0) {
    throw new AppError(
      'Points must be greater than zero',
      400,
      ERROR_CODES.TRANSFER.INVALID_AMOUNT
    );
  }
  const [sender, recipient] = await Promise.all([
    prisma.user.findUnique({ where: { id: senderId } }),
    prisma.user.findUnique({ where: { id: recipientId } }),
  ]);

  // Cek apakah pengirim itu ada
  // Cek apakah penerima itu ada
  if (!sender || !recipient) {
    const notfound = sender ? 'recipient' : 'sender';
    throw new AppError(
      `${notfound} is not found`,
      404,
      ERROR_CODES.USER.NOT_FOUND
    );
  }

  // Cek apakah point pengirim cukup
  if (sender.point < amount) {
    throw new AppError(
      'your points are lacking',
      400,
      ERROR_CODES.TRANSFER.INSUFFICIENT_POINTS
    );
  }

  // transfer
  const result = await prisma.$transaction(async (tx) => {
    const updatedSender = await tx.user.update({
      where: { id: senderId },
      data: {
        point: { decrement: amount },
      },
      select: {
        id: true,
        point: true,
      },
    });

    const updatedRecipient = await tx.user.update({
      where: { id: recipientId },
      data: {
        point: { increment: amount },
      },
      select: {
        id: true,
        point: true,
      },
    });

    return { updatedSender, updatedRecipient };
  });

  return result;
};
