/*************************************************************************************************
*   @Searching List 
*		1. DetectResolution	 : 화면 해상도에 따른 CSS 클래스 바꾸기
*************************************************************************************************/
(function () {
	if (window.CssChange) return;


	var resizeClass = null;

	/**
	* CSS 클래스 변환
	*
	* @namespace
	*/
	CssChange = {
		DetectResolution: function () {
			var $wrapper = $('#wrap'); //CSS가 바뀔 최상위 Wrapper
			var $content = $('#content'); // content area
			var className = 'cw';  // 대표 클래스명
			var contentAreaWidth = $(window).width();
			var fontSizeChange;
			var lineHeightChange;

			if (resizeClass && resizeClass.start <= contentAreaWidth && resizeClass.end > contentAreaWidth) {

			} else {
				// 해상도별 클래스 셋팅 class='cw1080'
				if (contentAreaWidth >= 769) {
					//제품상세보기 영상
					if($('.m_layer').css('display')!='none' && $('.m_layer').length!=0){
						$('.m_layer').css('display', 'none');
						$('html').css('overflow','auto');
						noScroll('off');
					}
					$(".m_cont_play").empty().remove();
				}

				// 웹 최소 사이즈일때 class='cw768'
				/*else if (768 < contentAreaWidth && contentAreaWidth < 1080) {
				}*/

				// 웹 중간 사이즈일때 class='cw320'
				if (contentAreaWidth <= 768) { //2016-10-04 : 768px에서 480px로 모바일 분기점 수정
					//제품상세보기 영상
					$(".movie_cont_play").empty().remove();

					//가로모드
					if (contentAreaWidth > get_winH() ) {
						$('.cont_info h4, .cont_info h5, .cont_info h6, .cont_info span, .cont_info p, .cont_info span, .cont_info span, .cont_info em, .cont_info strong, .cont_info dt, .cont_info dd, .cont_info li').each(function(){
							fontSizeChange = $(this).css('font-size');
							lineHeightChange = $(this).css('line-height');
							if(parseInt(fontSizeChange) == 13 || parseInt(fontSizeChange) == 12){
								$(this).css({
									'font-size' : '18px',
									'line-height' : '22px'
								});
							}
							if(parseInt(fontSizeChange) == 25 || parseInt(fontSizeChange) == 20){
								$(this).css({
									'font-size' : '30px',
									'line-height' : '35px'
								});
							}
						});
					}

					//세로모드
					if (contentAreaWidth < get_winH() ) {
						$('.cont_info h4, .cont_info h5, .cont_info h6, .cont_info span, .cont_info p, .cont_info span, .cont_info span, .cont_info em, .cont_info strong, .cont_info dt, .cont_info dd, .cont_info li').each(function(){
							fontSizeChange = $(this).css('font-size');
							lineHeightChange = $(this).css('line-height');
							if(parseInt(fontSizeChange) == 12 || parseInt(fontSizeChange) == 18){
								$(this).css({
									'font-size' : '13px',
									'line-height' : '18px'
								});
							}
							if(parseInt(fontSizeChange) == 20 || parseInt(fontSizeChange) == 30){
								$(this).css({
									'font-size' : '25px',
									'line-height' : '30px'
								});
							}
						});
					}
				}

				//제품상세 320해상도를 맞추기 위한 font-size, line-height 조정
				if (contentAreaWidth <= 320 ) {
					$('.cont_info h4, .cont_info h5, .cont_info h6, .cont_info span, .cont_info p, .cont_info span, .cont_info span, .cont_info em, .cont_info strong, .cont_info dt, .cont_info dd, .cont_info li').each(function(){
						fontSizeChange = $(this).css('font-size');
						lineHeightChange = $(this).css('line-height');
						if(parseInt(fontSizeChange) == 13 || parseInt(fontSizeChange) == 18){
							$(this).css({
								'font-size' : '12px',
								'line-height' : '16px'
							});
						}
						if(parseInt(fontSizeChange) == 25 || parseInt(fontSizeChange) == 30){
							$(this).css({
								'font-size' : '20px',
								'line-height' : '25px'
							});
						}
					});
				}/*else{
					$('.cont_info span, .cont_info p, .cont_info em').each(function(){
						fontSizeChange = $(this).css('font-size');
						lineHeightChange = $(this).css('line-height');
						if(parseInt(fontSizeChange) == 12){
							$(this).css({
								'font-size' : '14px',
								'line-height' : '20px'
							});
						}
						if(parseInt(fontSizeChange) == 18){
							$(this).css({
								'font-size' : '20px',
								'line-height' : '25px'
							});
						}
					});
				}*/

			}
		},
		setWrapperClass: function (info) {
			resizeClass = info;
			CssChange.DetectResolution();
		},
		resetWrapperClass: function () {
			var $wrapper = $('#wrap'); //CSS가 바뀔 최상위 Wrapper
			resizeClass = null;
			CssChange.DetectResolution();
		}
	};
})(window);


$(function () {
	// CssChange Load
	$(window).resize(function () {
		CssChange.DetectResolution();
	});

	CssChange.DetectResolution();
});
