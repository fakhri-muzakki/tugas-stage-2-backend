import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../libs/prisma';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryQuery = req.query.categories as string | undefined;
    // /comments-summary?categories=3,2 = [3,2]

    const categoryIds = categoryQuery
      ? categoryQuery.split(',').map((id) => Number(id))
      : [];

    const data = await prisma.post.findMany({
      where: categoryIds.length
        ? {
            categories: {
              some: {
                id: {
                  in: categoryIds,
                },
              },
            },
          }
        : undefined,
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

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
  categories: string[];
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
        categories: {
          connect: body.categories.map((id: string) => ({ id: Number(id) })),
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
        categories: body.categories
          ? {
              set: body.categories.map((id: string) => ({ id: Number(id) })),
            }
          : undefined,
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

interface GetCommentsPostQuery {
  page: string;
  limit: string;
}

export const getCommentsPost = async (
  req: Request<{ id: string }, object, object, GetCommentsPostQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const data = await prisma.comment.findMany({
      skip,
      take: limit,
      where: { postId: Number(id) },
    });

    return res.status(200).json({
      success: true,
      message: 'Comment post fetched successfully',
      data,
      meta: {
        page,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Mengambil semua comment di group berdasarkan post
export const getCommentSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const data = await prisma.post.findMany({
      skip,
      take: limit,
      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Comment summary fetched successfully',
      data,
      meta: {
        page,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};
