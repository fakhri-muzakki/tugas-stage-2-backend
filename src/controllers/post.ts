import { type NextFunction, type Request, type Response } from 'express';
import { deletePostById, posts } from '../models/post';

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = posts;

    return res.status(200).json({
      success: true,
      message: 'All posts successfully acquired.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = req.body;
    const id = posts.length + 1;
    const data = { id, ...post };
    posts.push(data);

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    deletePostById(Number(id));

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
