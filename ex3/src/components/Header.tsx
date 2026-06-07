import { useState } from 'react'
import { Link } from 'react-router-dom'

const menuItems = [
  { label: '회사소개', sub: ['인사말', '연혁', '조직도', '오시는길'] },
  { label: '제품소개', sub: ['벽면', '바닥', '도어', '몰딩', '시트', '가구'] },
  { label: '시공사례', sub: ['시공실적', '시공갤러리'] },
  { label: '견적문의', sub: ['견적문의'] },
  { label: '고객센터', sub: ['성공소식', '보도자료'] },
]

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false)

  return (
    <div id="header">
      <div className="size">
        <div className="inner clear">
          <h1 className="logo Abs_lc">
            <Link to="/"><img src="/img/logo.png" alt="로고" /></Link>
          </h1>
          <nav className="gnb">
            <ul className="itemList5 clear depth1">
              {menuItems.map((item, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => setActiveMenu(idx)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link to="">{item.label}</Link>
                  <ul className={`clear depth2 Abs${activeMenu === idx ? ' open' : ''}`}>
                    {item.sub.map((sub, sidx) => (
                      <li key={sidx}><Link to="">{sub}</Link></li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu Abs_rc">
            <button
              type="button"
              className={`allmenu${isAllMenuOpen ? ' on' : ''}`}
              onClick={() => setIsAllMenuOpen(prev => !prev)}
              style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
            >
              전체메뉴
            </button>
          </div>
        </div>
      </div>
      <div className={`allgnb${isAllMenuOpen ? ' open' : ''}`}>
        <div className="size">
          <div className="inner clear">
            <div className="menus">
              {menuItems.map((item, idx) => (
                <ul key={idx}>
                  {item.sub.map((sub, sidx) => (
                    <li key={sidx}><Link to="">{sub}</Link></li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
