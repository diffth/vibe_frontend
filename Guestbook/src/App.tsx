import { useState, useEffect, useCallback } from 'react';
import type { Post, SortOrder } from './types/post';
import { getPosts, createPost, updatePost, deletePost, likePost } from './api/postApi';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Toast from './components/Toast';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  function handleApiError(err: unknown) {
    const e = err as { status?: number };
    if (e.status === 404) {
      alert('이미 삭제된 글이거나 존재하지 않는 게시글입니다.');
      fetchPosts();
    } else {
      showToast('네트워크 연결이 불안정합니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPosts(sortOrder);
      setPosts(data);
    } catch (err) {
      showToast('글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [sortOrder]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleCreate(author: string, content: string) {
    setIsLoading(true);
    try {
      await createPost(author, content);
      await fetchPosts();
    } catch (err) {
      handleApiError(err);
      throw err; // PostForm이 입력 필드를 유지하도록 re-throw
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEdit(id: number, author: string, content: string) {
    try {
      const updated = await updatePost(id, author, content);
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }

  async function handleDelete(id: number) {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }

  async function handleLike(id: number) {
    try {
      const result = await likePost(id);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, likes: result.likes } : p))
      );
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }

  function handleSortChange(order: SortOrder) {
    setSortOrder(order);
  }

  return (
    <div>
      <h1>우리반 방명록</h1>
      <PostForm onSubmit={handleCreate} isLoading={isLoading} />
      <PostList
        posts={posts}
        sortOrder={sortOrder}
        isLoading={isLoading}
        onSortChange={handleSortChange}
        onRefresh={fetchPosts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onLike={handleLike}
      />
      <Toast message={toast} />
    </div>
  );
}
