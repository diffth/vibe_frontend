export default function Footer() {
  return (
    <div id="footer">
      <div className="size">
        <div className="inner">
          <div className="address">
            <div className="f_logo">
              <a href="#"><img src="/img/f_logo.png" alt="로고" /></a>
            </div>
            <ul>
              <li>
                <span className="c_name">성공건축자재</span>
              </li>
              <li>
                <span>인천시 계양구 동양동</span>
                <span className="width100">Tel : 02-1234-5678</span>
              </li>
              <li>
                <span>대표이사 : 서민구</span>
                <span>사업자등록번호 : 123-45-67890</span>
              </li>
            </ul>
            <div className="copy">
              Copyright 2025 codro. All Rights Reserved
            </div>
            <div className="util">
              <a href="#">개인정보취급방침</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
