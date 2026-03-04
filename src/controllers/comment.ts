import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../libs/prisma';

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.comment.findMany();

    return res.status(200).json({
      success: true,
      message: 'Comments fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, postId, userId } = req.body;

    const data = await prisma.comment.create({
      data: {
        content,
        post: {
          connect: { id: Number(postId) },
        },
        user: {
          connect: { id: Number(userId) },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Comment created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.comment.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: Request<{ id: string }, object, { content: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const data = await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        content,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
