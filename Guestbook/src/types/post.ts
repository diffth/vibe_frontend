export interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export type SortOrder = 'latest' | 'likes';
