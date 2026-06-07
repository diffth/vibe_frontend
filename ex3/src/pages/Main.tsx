import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

const visualSlides = [
  { cls: 'bg1' },
  { cls: 'bg2' },
  { cls: 'bg3' },
  { cls: 'bg4' },
  { cls: 'bg5' },
]

const products = [
  { cls: 'pro01', icon: '/img/round_ico01.png', label: '벽면' },
  { cls: 'pro02', icon: '/img/round_ico02.png', label: '바닥' },
  { cls: 'pro03', icon: '/img/round_ico03.png', label: '도어' },
  { cls: 'pro04', icon: '/img/round_ico04.png', label: '몰딩' },
  { cls: 'pro05', icon: '/img/round_ico05.png', label: '시트' },
  { cls: 'pro06', icon: '/img/round_ico06.png', label: '가구' },
]

const cases = [
  { img: '/img/demo_01.jpg', category: '시트', title: '목질변멱재 우드' },
  { img: '/img/demo_01.jpg', category: '시트', title: '목질변멱재 우드' },
  { img: '/img/demo_01.jpg', category: '시트', title: '목질변멱재 우드' },
  { img: '/img/demo_01.jpg', category: '시트', title: '목질변멱재 우드' },
]

const notices = [
  { isTop: true, text: '성공건축자재 홈페이지를 오픈하였습니다.', date: '2018-08-01' },
  { isTop: false, text: '성공건축자재 홈페이지를 오픈하였습니다.', date: '2018-08-01' },
  { isTop: false, text: '성공건축자재 홈페이지를 오픈하였습니다.', date: '2018-08-01' },
]

export default function Main() {
  return (
    <div id="main" className="animate">

      {/* Visual Section */}
      <div className="visual">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
        >
          {visualSlides.map((slide, idx) => (
            <SwiperSlide key={idx} className={slide.cls}>
              <div className="txt">
                <div className="slogun">
                  <p className="rale">new dream</p>
                  <strong className="rale-exbold">we build</strong>
                </div>
                <div className="desc">
                  <p>
                    최고의 제품과 최고의 서비스로 <br />고객만족을 실현합니다.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Section */}
      <div className="section">
        <div className="size">
          <div className="section_title">
            <h3>product</h3>
            <p>지속적인 변화와 혁신으로 더 나은 세상을 만들어가겠습니다</p>
          </div>
          <div className="round_wrap">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              slidesPerView={5}
              spaceBetween={30}
              loop={true}
            >
              {products.map((p, idx) => (
                <SwiperSlide key={idx}>
                  <a href="#" className={p.cls}>
                    <div className="round">
                      <div className="overlay">
                        <div className="tb">
                          <div className="tbc">
                            <p className="ico"><img src={p.icon} alt={p.label} /></p>
                            <p>{p.label}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Construction Case Section */}
      <div className="section color">
        <div className="size">
          <div className="section_title">
            <h3>construction case</h3>
            <p>지속적인 변화와 혁신으로 더 나은 세상을 만들어가겠습니다</p>
          </div>
          <div className="case">
            <div className="case_list">
              <ul className="clear">
                {cases.map((c, idx) => (
                  <li key={idx}>
                    <a href="">
                      <p className="imgs" style={{ backgroundImage: `url('${c.img}')` }}>
                        <img src={c.img} alt="기본이미지" />
                      </p>
                      <div className="txt">
                        <p>{c.category}</p>
                        <div className="subject">
                          <b>{c.title}</b>
                          <span>+</span>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="list_btn_more">
              <a href="#">더보기 <img src="/img/plus_w.png" alt="더보기" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* BBS Section */}
      <div className="section">
        <div className="size">
          <div className="bbs_wrap">
            <div className="clear">

              {/* 공지사항 */}
              <div className="bbs_box not">
                <strong>공지사항</strong>
                <ul>
                  {notices.map((n, idx) => (
                    <li key={idx}>
                      <a href="" className={n.isTop ? 'important' : ''}>
                        <div className="subject">
                          {n.isTop && <img src="/img/ico_top.png" alt="TOP공지" />}
                          {n.text}
                        </div>
                        <span className="date">{n.date}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="btn_more">
                  <a href="">더보기 <img src="/img/plus_r.png" alt="더보기" /></a>
                </div>
              </div>

              {/* 고객센터 */}
              <div className="bbs_box cs">
                <strong>고객센터</strong>
                <p className="ico"><img src="/img/cs_ico.png" alt="고객센터" /></p>
                <a href="tel:02-1234-5678">02-1234-5678</a>
                <div className="desc">
                  <p>FAX: 02-1234-5678</p>
                  <p>E-MAIL: codro.ceo@codro.it</p>
                </div>
              </div>

              {/* 견적문의 */}
              <div className="bbs_box inq">
                <strong>견적문의</strong>
                <p className="ico"><img src="/img/inq_ico.png" alt="견적문의" /></p>
                <div className="desc">
                  항상 최고의 품질을 제품들을 제공하기 위해 <br />
                  성공건축자재는 항상 최선을 다하겠습니다.
                </div>
                <a href="#">견적문의하기 <img src="/img/plus_w.png" alt="바로가기" /></a>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
