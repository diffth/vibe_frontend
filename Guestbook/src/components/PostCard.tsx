import { useState } from 'react';
import type { Post } from '../types/post';
import EditModal from './EditModal';

interface Props {
  post: Post;
  onEdit: (id: number, author: string, content: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onLike: (id: number) => Promise<void>;
}

export default function PostCard({ post, onEdit, onDelete, onLike }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const formattedDate = new Date(post.updatedAt).toLocaleString('ko-KR');

  async function handleLike() {
    setIsActionLoading(true);
    try {
      await onLike(post.id);
    } finally {
      setIsActionLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setIsActionLoading(true);
    try {
      await onDelete(post.id);
    } finally {
      setIsActionLoading(false);
    }
  }

  async function handleSave(content: string) {
    setIsActionLoading(true);
    try {
      await onEdit(post.id, post.author, content);
      setIsEditing(false);
    } finally {
      setIsActionLoading(false);
    }
  }

  return (
    <div className="post-card">
      <div className="post-card__header">
        <span className="post-card__author">{post.author}</span>
        <span className="post-card__date">{formattedDate}</span>
      </div>

      {isEditing ? (
        <EditModal
          post={post}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          isLoading={isActionLoading}
        />
      ) : (
        <p className="post-card__content">{post.content}</p>
      )}

      <div className="post-card__footer">
        <button
          className="btn btn--like"
          onClick={handleLike}
          disabled={isActionLoading}
        >
          ❤️ {post.likes}
        </button>
        <div className="post-card__actions">
          <button
            className="btn btn--text"
            onClick={() => setIsEditing(true)}
            disabled={isActionLoading || isEditing}
          >
            수정
          </button>
          <button
            className="btn btn--text btn--danger"
            onClick={handleDelete}
            disabled={isActionLoading}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
