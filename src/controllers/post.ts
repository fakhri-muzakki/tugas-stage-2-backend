import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../libs/prisma';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await prisma.post.findMany();

    return res.status(200).json({
      success: true,
      message: 'Post retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

interface PostRequest {
  title: string;
  authorId: string;
  content: string;
  published: 'false' | 'true';
}

export const createPost = async (
  req: Request<object, object, PostRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const userId = Number(body.authorId);
    const published = body.published ? body.published === 'true' : undefined;

    const data = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: published,
        author: {
          connect: { id: userId },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Post created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // cek apakah post dengan id ini itu ada
    await prisma.post.delete({ where: { id: Number(id) } });

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request<{ id: string }, object, Partial<PostRequest>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const published = body.published ? body.published === 'true' : undefined;

    const data = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        content: body.content,
        published: published,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
