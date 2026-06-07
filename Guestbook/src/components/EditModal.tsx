import { useState } from 'react';
import type { Post } from '../types/post';

interface Props {
  post: Post;
  onSave: (content: string) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export default function EditModal({ post, onSave, onCancel, isLoading }: Props) {
  const [editContent, setEditContent] = useState(post.content);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editContent.trim().length === 0) return;
    onSave(editContent);
  }

  return (
    <form className="edit-modal" onSubmit={handleSubmit}>
      <textarea
        className="edit-modal__textarea"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        maxLength={200}
        rows={4}
        disabled={isLoading}
      />
      <div className="edit-modal__meta">
        <span className="char-counter">{editContent.length} / 200자</span>
        <div className="edit-modal__buttons">
          <button type="button" className="btn btn--text" onClick={onCancel} disabled={isLoading}>
            취소
          </button>
          <button type="submit" className="btn btn--primary" disabled={isLoading || editContent.trim().length === 0}>
            저장
          </button>
        </div>
      </div>
    </form>
  );
}
