import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Raleway:400,600,800');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,700i|Sintony');

  @font-face {
    font-family: 'NanumGothic';
    src: url('/font/NanumGothic.eot');
    src: url('/font/NanumGothic.eot?#iefix') format('embedded-opentype'),
         url('/font/NanumGothic.woff') format('woff'),
         url('/font/NanumGothic.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  /* ==================== Reset ==================== */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; min-height: 100%; }
  body { font-family: 'NanumGothic', sans-serif; font-size: 14px; color: #333; line-height: 1.5; }
  ul, ol { list-style: none; }
  a { text-decoration: none; color: inherit; }
  img { border: 0; vertical-align: top; max-width: 100%; }
  button { cursor: pointer; border: none; background: none; }
  table { border-collapse: collapse; }
  h1, h2, h3, h4, h5, h6 { font-weight: normal; }
  input, select, textarea { font-family: inherit; font-size: inherit; }
  input[type=button] { cursor: pointer !important; }

  /* ==================== 공통 레이아웃 ==================== */
  .wrapper { width: 100%; position: relative; margin: 0 auto; min-height: 600px; }
  .size { width: 100%; max-width: 1280px; height: auto; margin: 0 auto; position: relative; }
  .inner { width: 100%; padding: 0 20px; box-sizing: border-box; position: relative; }

  /* ==================== 위치 유틸리티 ==================== */
  .Abs { position: absolute; }
  .Fix { position: fixed; }
  .Abs_lt { position: absolute; top: 0; left: 0; }
  .Abs_rt { position: absolute; top: 0; right: 0; }
  .Abs_lc { position: absolute; left: 0; top: 50%; }
  .Abs_rc { position: absolute; right: 0; top: 50%; }
  .Abs_cc { position: absolute; left: 50%; top: 50%; }

  /* ==================== 테이블 정렬 ==================== */
  .tb { display: table; height: 100%; width: 100%; }
  .tbc { display: table-cell; vertical-align: middle; }

  /* ==================== 텍스트 ==================== */
  .clear::after { clear: both; content: ''; display: block; }
  .blind { position: absolute; top: -999999px; width: 0; height: 0; font-size: 0; overflow: hidden; }
  .cp { cursor: pointer !important; }
  .fl_l { float: left !important; }
  .fl_r { float: right !important; }
  .txt_c { text-align: center !important; }
  .txt_l { text-align: left !important; }
  .txt_r { text-align: right !important; }

  /* ==================== itemList ==================== */
  .itemList2 > * { width: 50%; float: left; }
  .itemList3 > * { width: 33.3333%; float: left; }
  .itemList4 > * { width: 25%; float: left; }
  .itemList5 > * { width: 20%; float: left; }

  /* ==================== 웹폰트 클래스 ==================== */
  .rale { font-family: 'Raleway', sans-serif; font-weight: 400; }
  .rale-bold { font-family: 'Raleway', sans-serif; font-weight: 600; }
  .rale-exbold { font-family: 'Raleway', sans-serif; font-weight: 800; }
  .roboto { font-family: 'Roboto Condensed', sans-serif; }

  /* ==================== 색상 ==================== */
  .cr { color: #f37339; }
  .cw { color: #fff; }
  .cdb { color: #003355; }

  /* ==================== 스킵 내비게이션 ==================== */
  a.skip { display: block; position: absolute; top: -1px; z-index: 999; width: 0; height: 0; overflow: hidden; }
  a.skip:focus { z-index: 999; width: 100%; height: auto; padding: 5px; background: #fff; }

  /* ==================== GNB 링크 전환 ==================== */
  .gnb li a { transition: all .3s ease; }

  /* ==================== Header ==================== */
  #header { position: fixed; height: 90px; z-index: 100; background: #fff; border-bottom: 1px solid rgba(255,255,255,.2); box-sizing: border-box; width: 100%; }
  #header .logo { margin-top: -25px; display: block; }
  #header .logo a { display: block; font-size: 0; padding: 10px 0; }
  #header .inner { padding-left: 120px; padding-right: 70px; }
  #header .gnb { float: right; box-sizing: border-box; }
  #header .gnb .depth1 > li { height: 90px; padding: 20px 0; position: relative; box-sizing: border-box; }
  #header .gnb .depth1 > li > a { display: block; height: 50px; line-height: 50px; width: 140px; text-align: center; font-size: 19px; color: #373131; }
  #header .gnb .depth1 > li > a:hover, #header .gnb .depth1 > li > a.on { color: #f37339; }
  #header .gnb .depth2 { display: none; z-index: 100; background: rgba(0,0,0,.6); width: 100%; top: 90px; border-top: 2px solid #f37339; box-sizing: border-box; padding: 10px 0; left: 0; position: absolute; }
  #header .gnb .depth2.open { display: block; }
  #header .gnb .depth2 > li a { display: block; text-align: center; font-size: 16px; height: 40px; line-height: 40px; color: #fff; }
  #header .gnb .depth2 > li > a:hover, #header .gnb .depth2 > li > a.on { color: #f37339; }
  #header .menu { margin-top: -25px; z-index: 100; right: 0; }
  #header .menu a, #header .menu button { display: block; width: 50px; height: 50px; line-height: 50px; text-indent: -9999px; background: url('/img/menu_ico.png') no-repeat center center; font-size: 0; color: #fff; text-align: center; }
  #header .menu a.on, #header .menu button.on { background: url('/img/menu_close_ico.png') no-repeat center center; }
  #header .allgnb { display: none; position: absolute; top: 90px; left: 0; width: 100%; z-index: 101; background: rgba(0,0,0,.6); }
  #header .allgnb.open { display: block; }
  #header .allgnb .menus { float: right; }
  #header .allgnb .menus ul { float: left; width: 140px; padding: 10px 0; box-sizing: border-box; position: relative; }
  #header .allgnb .menus ul::before { position: absolute; top: 0; left: 50%; width: 0; height: 2px; background: #f37339; clear: both; content: ''; display: block; transition: all .3s; }
  #header .allgnb .menus ul li a { display: block; height: 40px; line-height: 40px; color: #fff; font-size: 16px; text-align: center; }
  #header .allgnb .menus ul li a:hover, #header .allgnb .menus ul li a.on { color: #f37339; }

  @media (max-width: 1200px) {
    #header .gnb { margin-left: 200px; }
    #header .gnb .depth1 > li { width: 18%; }
  }
  @media (max-width: 840px) {
    #header { display: none; }
  }

  /* ==================== Footer ==================== */
  #footer { width: 100%; height: 160px; background: #333333; }
  #footer .inner { height: 160px; padding: 40px 0; box-sizing: border-box; position: relative; }
  #footer .util { position: absolute; right: 0; top: 0; z-index: 2; }
  #footer .util a { display: block; font-size: 14px; color: rgba(255,255,255,0.8); width: 180px; height: 40px; line-height: 39px; border: 1px solid rgba(255,255,255,0.8); text-align: center; letter-spacing: -1px; }
  #footer .address { position: relative; padding-right: 190px; box-sizing: border-box; z-index: 1; }
  #footer .address ul { position: absolute; top: 10px; left: 140px; }
  #footer .address ul li { overflow: hidden; margin-bottom: 5px; color: #fff; font-size: 14px; line-height: 20px; letter-spacing: -0.5px; }
  #footer .address ul .c_name { font-size: 18px; margin-bottom: 15px; letter-spacing: -0.5px; display: inline-block; }
  #footer .address ul li span { display: inline-block; vertical-align: top; float: left; margin-left: 15px; font-weight: 400; }
  #footer .address ul li span:first-child { margin-left: 0; }
  #footer .address .copy { position: absolute; right: 0; top: 50px; color: rgba(255,255,255,0.4); font-size: 12px; line-height: 20px; letter-spacing: -0.5px; font-weight: 300; }
  #footer .f_logo {}

  @media (max-width: 840px) {
    #footer { height: 300px; }
    #footer .inner { padding: 30px 20px; }
    #footer .f_logo { text-align: center; }
    #footer .util { position: relative; right: initial; top: initial; left: 50%; margin-left: -90px; margin-top: 130px; }
    #footer .address { padding-right: 0; }
    #footer .address ul { width: 100%; top: 50px; left: 0; }
    #footer .address ul li { text-align: center; margin-bottom: 0; }
    #footer .address ul li span { float: none; }
    #footer .address .copy { position: relative; right: initial; left: 50%; margin-left: -105px; top: 105px; }
  }

  /* ==================== Main ==================== */
  #main { width: 100%; padding-top: 90px; }

  /* Visual Section */
  .visual { width: 100%; position: relative; }
  .visual .swiper { height: 750px; }
  .visual .swiper-slide { height: 750px; background-repeat: no-repeat; background-size: cover; background-position: center center; text-align: center; }
  .visual .bg1 { background-image: url('/img/visual01.jpg'); }
  .visual .bg2 { background-color: #ccc; }
  .visual .bg3 { background-color: #aac; }
  .visual .bg4 { background-color: #fa3; }
  .visual .bg5 { background-color: #7ac; }

  .visual .swiper-slide .txt { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
  .visual .swiper-slide .slogun { padding: 30px 50px 0; color: #f37339; text-transform: uppercase; line-height: 0.9; position: relative; border: 6px solid #f37339; border-bottom: 0; text-shadow: 1px 1px 1px rgba(119,34,34,.5); }
  .visual .swiper-slide .slogun::after { position: absolute; bottom: -6px; left: -6px; width: 50px; height: 6px; background: #f37339; clear: both; content: ''; display: block; }
  .visual .swiper-slide .slogun::before { position: absolute; bottom: -6px; right: -6px; width: 50px; height: 6px; background: #f37339; clear: both; content: ''; display: block; }
  .visual .swiper-slide .slogun p { font-size: 50px; }
  .visual .swiper-slide .slogun strong { display: block; font-size: 85px; }
  .visual .swiper-slide .desc { color: #fff; font-size: 24px; line-height: 1.3; padding-top: 40px; padding-bottom: 40px; }

  .visual .swiper-button-prev, .visual .swiper-button-next { width: 58px; height: 57px; margin-top: -28.5px; background-repeat: no-repeat; background-size: contain; background-position: center center; }
  .visual .swiper-button-prev { background-image: url('/img/visual_prev.png'); left: 45px; }
  .visual .swiper-button-next { background-image: url('/img/visual_next.png'); right: 45px; }
  .visual .swiper-button-prev::after, .visual .swiper-button-next::after { display: none; }
  .visual .swiper-pagination-bullet { width: 36px; height: 4px; background: #fff; border-radius: 0; }
  .visual .swiper-pagination-bullet-active { height: 6px; }

  /* Section 공통 */
  .section { padding: 60px 0; }
  .section .section_title { text-align: center; }
  .section .section_title h3 { font-family: 'Raleway', sans-serif; font-weight: 800; text-transform: uppercase; color: #f37339; font-size: 45px; letter-spacing: -1px; }
  .section .section_title p { color: #515155; font-size: 18px; font-weight: 400; letter-spacing: -.5px; }
  .section.color { background: #f37339; }
  .section.color .section_title h3 { color: #fff; }
  .section.color .section_title p { color: #fff; }

  /* Product Round Swiper */
  .section .round_wrap { margin-top: 40px; position: relative; }
  .section .round_wrap a { width: 236px; height: 236px; position: relative; border-radius: 50%; background-repeat: no-repeat; background-position: center center; background-size: cover; transition: all .4s; display: block; }
  .section .round_wrap .overlay { position: absolute; width: 70%; height: 70%; left: 15%; top: 15%; border-radius: 50%; text-align: center; background: transparent; color: #fff; transition: all .4s; }
  .section .round_wrap a:hover .overlay { background: rgba(243,115,57,.8); }
  .section .round_wrap .swiper { overflow: visible; }
  .section .round_wrap .swiper-button-prev { width: 18px; height: 33px; margin-top: -16.5px; left: -38px; background: url('/img/prev_ico.png') no-repeat center center; background-size: contain; }
  .section .round_wrap .swiper-button-next { width: 18px; height: 33px; margin-top: -16.5px; right: -38px; background: url('/img/next_ico.png') no-repeat center center; background-size: contain; }
  .section .round_wrap .swiper-button-prev::after, .section .round_wrap .swiper-button-next::after { display: none; }
  .section .round_wrap .pro01 { background-image: url('/img/round_01.png'); }
  .section .round_wrap .pro02 { background-image: url('/img/round_02.png'); }
  .section .round_wrap .pro03 { background-image: url('/img/round_03.png'); }
  .section .round_wrap .pro04 { background-image: url('/img/round_04.png'); }
  .section .round_wrap .pro05 { background-image: url('/img/round_05.png'); }
  .section .round_wrap .pro06 { background-image: url('/img/round_06.png'); }

  /* Construction Case */
  .section .case { width: 100%; position: relative; }
  .section .case_list { width: 100%; position: relative; margin-top: 60px; }
  .section .case_list ul { width: 102%; margin-left: -2%; }
  .section .case_list li { width: 23%; margin-left: 2%; float: left; }
  .section .case_list li a { display: block; position: relative; }
  .section .case_list li a .imgs { background-repeat: no-repeat; background-size: cover; background-position: center center; }
  .section .case_list li a .imgs img { width: 100%; height: auto; max-width: 100%; visibility: hidden; opacity: 0; }
  .section .case_list li a .txt { padding: 15px 20px; box-sizing: border-box; background: #fff; }
  .section .case_list li a .txt p { color: #f37339; font-size: 16px; font-weight: 300; }
  .section .case_list li a .txt .subject { overflow: hidden; padding-right: 30px; box-sizing: border-box; position: relative; }
  .section .case_list li a .txt .subject b { display: block; overflow: hidden; max-width: 100%; white-space: nowrap; text-overflow: ellipsis; color: #373131; font-size: 20px; font-weight: 600; letter-spacing: -.5px; }
  .section .case_list li a .txt .subject span { display: block; position: absolute; right: 0; top: 50%; margin-top: -12.5px; width: 25px; height: 25px; border-radius: 50%; background: #f37339 url('/img/plus_w.png') no-repeat center center; text-indent: -9999px; }
  .section .case .list_btn_more { text-align: center; margin-top: 50px; }
  .section .case .list_btn_more a { display: inline-block; width: 200px; height: 50px; border: 2px solid #fff; box-sizing: border-box; text-align: center; border-radius: 50px; line-height: 46px; font-size: 16px; color: #fff; font-weight: 600; }
  .section .case .list_btn_more a img { margin-top: -3px; margin-left: 10px; }

  /* BBS Section */
  .section .bbs_wrap { width: 100%; position: relative; }
  .section .bbs_wrap > .clear { width: 102%; margin-left: -2%; }
  .section .bbs_wrap .bbs_box { width: 31.3333%; margin-left: 2%; float: left; box-sizing: border-box; padding: 20px; border: 1px solid #dadada; min-height: 270px; }
  .section .bbs_wrap .bbs_box strong { display: block; text-align: center; color: #373131; font-size: 26px; }

  .section .bbs_wrap .not ul { padding: 20px 0; min-height: 108px; }
  .section .bbs_wrap .not ul li a { width: 100%; display: block; padding-right: 85px; box-sizing: border-box; border-bottom: 1px dotted #dadada; position: relative; line-height: 35px; transition: all .2s; }
  .section .bbs_wrap .not ul li a .subject { width: 100%; display: block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 16px; font-weight: 400; color: #333333; }
  .section .bbs_wrap .not ul li a .date { display: block; position: absolute; line-height: 35px; right: 0; top: 0; font-size: 15px; font-weight: 300; color: #828282; }
  .section .bbs_wrap .not ul li a:hover { background: rgba(155,155,155,.1); }
  .section .bbs_wrap .not .btn_more { text-align: center; }
  .section .bbs_wrap .not .btn_more a { display: inline-block; width: 130px; height: 35px; border-radius: 35px; border: 2px solid #f37339; color: #f37339; line-height: 31px; font-size: 16px; font-weight: 600; }
  .section .bbs_wrap .not .btn_more a img { margin-top: -4px; margin-left: 4px; }

  .section .bbs_wrap .bbs_box .ico { padding: 20px 0; text-align: center; }
  .section .bbs_wrap .cs { text-align: center; }
  .section .bbs_wrap .cs a { display: inline-block; text-align: center; color: #f37339; font-size: 32px; line-height: 1; font-weight: 900; }
  .section .bbs_wrap .cs .desc { padding-top: 20px; color: #5c5b5e; font-size: 16px; font-weight: 300; }
  .section .bbs_wrap .inq { border: 0; background: #f3f3f3; text-align: center; }
  .section .bbs_wrap .inq strong { color: #f37339; }
  .section .bbs_wrap .inq .desc { color: #5c5b5e; font-size: 16px; font-weight: 300; }
  .section .bbs_wrap .inq a { display: inline-block; margin: 20px auto 0; width: 160px; height: 35px; border-radius: 35px; line-height: 33px; background: #f37339; color: #fff; font-size: 16px; font-weight: 600; }
  .section .bbs_wrap .inq a img { margin-top: -4px; margin-left: 4px; }
`

export default GlobalStyle
