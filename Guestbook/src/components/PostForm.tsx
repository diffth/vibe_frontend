import { useState } from 'react';

interface Props {
  onSubmit: (author: string, content: string) => Promise<void>;
  isLoading: boolean;
}

export default function PostForm({ onSubmit, isLoading }: Props) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ author?: string; content?: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: { author?: string; content?: string } = {};
    if (author.trim().length === 0) newErrors.author = '작성자를 입력해주세요.';
    if (content.trim().length === 0) newErrors.content = '내용을 입력해주세요.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      await onSubmit(author.trim(), content.trim());
      setAuthor('');
      setContent('');
    } catch {
      // 부모에서 에러 처리 — 입력 필드 유지
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2 className="post-form__title">방명록 남기기</h2>

      <div className="post-form__field">
        <label htmlFor="author" className="post-form__label">작성자</label>
        <input
          id="author"
          type="text"
          className={`post-form__input ${errors.author ? 'is-error' : ''}`}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={10}
          placeholder="이름을 입력하세요 (최대 10자)"
          disabled={isLoading}
        />
        {errors.author && <span className="field-error">{errors.author}</span>}
      </div>

      <div className="post-form__field">
        <label htmlFor="content" className="post-form__label">내용</label>
        <textarea
          id="content"
          className={`post-form__textarea ${errors.content ? 'is-error' : ''}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={200}
          rows={4}
          placeholder="따뜻한 한마디를 남겨주세요 (최대 200자)"
          disabled={isLoading}
        />
        <div className="post-form__char-row">
          {errors.content && <span className="field-error">{errors.content}</span>}
          <span className="char-counter">{content.length} / 200자</span>
        </div>
      </div>

      <button type="submit" className="btn btn--primary btn--full" disabled={isLoading}>
        {isLoading ? '등록 중...' : '등록'}
      </button>
    </form>
  );
}
