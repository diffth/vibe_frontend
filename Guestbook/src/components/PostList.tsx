import type { Post, SortOrder } from '../types/post';
import PostCard from './PostCard';

interface Props {
  posts: Post[];
  sortOrder: SortOrder;
  isLoading: boolean;
  onSortChange: (order: SortOrder) => void;
  onRefresh: () => void;
  onEdit: (id: number, author: string, content: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onLike: (id: number) => Promise<void>;
}

export default function PostList({
  posts,
  sortOrder,
  isLoading,
  onSortChange,
  onRefresh,
  onEdit,
  onDelete,
  onLike,
}: Props) {
  return (
    <div className="post-list">
      <div className="filter-bar">
        <span className="post-counter">
          총 {posts.length}개의 따뜻한 한마디가 남아있어요
        </span>
        <div className="filter-bar__controls">
          <button
            className={`btn btn--sort ${sortOrder === 'latest' ? 'active' : ''}`}
            onClick={() => onSortChange('latest')}
          >
            최신순
          </button>
          <button
            className={`btn btn--sort ${sortOrder === 'likes' ? 'active' : ''}`}
            onClick={() => onSortChange('likes')}
          >
            좋아요순
          </button>
          <button className="btn btn--text" onClick={onRefresh} disabled={isLoading}>
            {isLoading ? '로딩...' : '새로고침'}
          </button>
        </div>
      </div>

      {posts.length === 0 && !isLoading && (
        <p className="empty-message">아직 작성된 글이 없습니다. 첫 번째 방명록을 남겨보세요!</p>
      )}

      <div className="post-list__feed">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
            onLike={onLike}
          />
        ))}
      </div>
    </div>
  );
}
