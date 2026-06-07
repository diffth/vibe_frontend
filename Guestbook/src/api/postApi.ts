import type { Post, SortOrder } from '../types/post';

const BASE_URL = 'https://guestbook-api.codro.it';

interface ApiError {
  status: number;
  message: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err: ApiError = { status: res.status, message: body.message ?? '오류가 발생했습니다.' };
    throw err;
  }
  return res.json() as Promise<T>;
}

export async function getPosts(sort: SortOrder): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/api/posts?sort=${sort}`);
  return handleResponse<Post[]>(res);
}

export async function createPost(author: string, content: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, content }),
  });
  return handleResponse<Post>(res);
}

export async function updatePost(id: number, author: string, content: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, content }),
  });
  return handleResponse<Post>(res);
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err: ApiError = { status: res.status, message: body.message ?? '오류가 발생했습니다.' };
    throw err;
  }
}

export async function likePost(id: number): Promise<{ id: number; likes: number }> {
  const res = await fetch(`${BASE_URL}/api/posts/${id}/like`, { method: 'POST' });
  return handleResponse<{ id: number; likes: number }>(res);
}
