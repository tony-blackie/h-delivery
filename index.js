$(document).ready(function() {
	initLandingHeight();
	slider();
	sliderCommentary();
	scrollPage();
});

function initLandingHeight() {
	var landing = $('.landing');
	var windowHeight = $(window).height();
	var landingTextHeight = $('.landing-text').height();
	var landingHeaderHeight = $('.header').height();
	var landingTextPadding = parseInt($('.title').css('padding-top'), 10);
	var landingHeight = windowHeight > (landingTextHeight + landingHeaderHeight + landingTextPadding) ?
			windowHeight : (landingTextHeight + landingHeaderHeight + landingTextPadding);

	$(landing).height(landingHeight);

}

function generateCarouselButtons(isThreeElementGallery, galleryLength) {
	var $carouselButtonWrapper = $('.about-us__carousel-buttons');
	var
			i,
			documentFragment = document.createDocumentFragment(),
			item;
	if(isThreeElementGallery) {
		galleryLength = Math.floor( galleryLength / 3 ) - 1; // -1 cause we create first element separately
	}
	item = $('<div></div>' ).addClass('about-us__carousel-buttons-item');
	for (i = 0; i < galleryLength; i++) {
		item.clone()
				.addClass('about-us__carousel-buttons-item' + (i + 1))
				.appendTo(documentFragment);
	}
	item.addClass('about-us__carousel-buttons-item0 about-us__carousel-buttons-item_active' )
			.prependTo(documentFragment);

	$(documentFragment).appendTo($carouselButtonWrapper);
}

function createElementSlider() {
	var $srcImg = $(".about-us__img"),
			$textUnderImg = $(".about-us__text"),
			$containerForImg = $(".about-us__icon-list"),
			documFragment = $('<div></div>'),
			allSrcImg = [],
			allTextUnderImg = [], i,
			allElementsForSlider = [],
			isThreeElementGallery,
			windowWidth = $(window).width();
	var documFragFromArray;

	isThreeElementGallery = true;

	for (i = 0; i < $srcImg.length; i++) {
		if ($srcImg.hasOwnProperty(i)) {
			allSrcImg.push($srcImg[i].getAttribute("src"));
		}
	}
	for (i = 0; i < $textUnderImg.length; i++) {
		if ($textUnderImg.hasOwnProperty(i)) {
			allTextUnderImg.push($textUnderImg[i].innerHTML);
		}
	}
	$containerForImg.children().remove();

	for (i = 0; i < allSrcImg.length; i++) {
		var figureElement = $('<figure></figure>'),
				imgElement = $('<img>'),
				textElement = $('<p></p>');

		figureElement.addClass("about-us__icon-list-item");
		imgElement.addClass("about-us__img");
		textElement.addClass("about-us__text");

		imgElement.attr("src", allSrcImg[i]);
		textElement.html(allTextUnderImg[i]);
		figureElement.append(imgElement);
		figureElement.append(textElement);
		documFragment.append(figureElement);

		if (isThreeElementGallery) {
			if (documFragment.children().length >= 3) {
				documFragFromArray = $("<div></div>");
				documFragFromArray.append(documFragment.children());
				allElementsForSlider.push(documFragFromArray.children());
				$(documFragment).children().remove();
			}
		} else {
			documFragFromArray = $("<div></div>");
			documFragFromArray.append(documFragment);
			allElementsForSlider.push(documFragFromArray);
			$(documFragment).children().remove();
		}
	}

	generateCarouselButtons(isThreeElementGallery, $srcImg.length);

	return allElementsForSlider;
}

function slider() {
	var arrValue = createElementSlider(),
			$containerForImg = $(".about-us__icon-list"),
			timer,
			timeForTimerMs = 3800,
			valueNumberSliderItem = 0;

	$containerForImg.append(arrValue[0]);
	timer = setInterval(moveElements, timeForTimerMs);
	$(".about-us__carousel-buttons-item").bind('click', movedItem);

	function moveElements() {
		$containerForImg.children().remove();
		$(".about-us__carousel-buttons-item" + valueNumberSliderItem)
				.removeClass("about-us__carousel-buttons-item_active");
		if (valueNumberSliderItem == arrValue.length - 1) {
			valueNumberSliderItem = -1;
		}
		valueNumberSliderItem++;
		$(".about-us__carousel-buttons-item" + valueNumberSliderItem)
				.addClass("about-us__carousel-buttons-item_active");
		$containerForImg.append(arrValue[valueNumberSliderItem]);
	}

	function movedItem(event) {
		var className = event.target.getAttribute("class"),
				numberImage;
		if (className.length > 65) {
			return;
		}
		clearInterval(timer);
		$containerForImg.children().remove();
		$(".about-us__carousel-buttons-item" + valueNumberSliderItem)
				.removeClass("about-us__carousel-buttons-item_active");
		numberImage = className.substring(63);
		valueNumberSliderItem = numberImage;
		$(".about-us__carousel-buttons-item" + valueNumberSliderItem)
				.addClass("about-us__carousel-buttons-item_active");
		$containerForImg.append(arrValue[valueNumberSliderItem]);
		timer = setInterval(moveElements, timeForTimerMs);
	}
}

function sliderCommentary() {
	var $moveBlock = $(".comments__move-block"),
			$prevBtn = $(".comments__arrow-prev"),
			$nextBtn = $(".comments__arrow-next"),
			widthContainerBlock = $(".comments__container-icon-list-item").width(),
			$listItem = $(".comments__icon-list-item"),
			widthListItem = $listItem.width(),
			numberChildInMoveBlock = $moveBlock.children().length,
			currentPositionSlider = 3,
			widthListItemForAnimate = widthContainerBlock / 3,
			widthForAnimate = 0;

	//$listItem.width(widthListItem);
	$moveBlock.width(widthListItem * numberChildInMoveBlock + 100);

	$nextBtn.on('click', movedNext);
	$prevBtn.on("click", movedPrev);

	function movedNext () {
		if(currentPositionSlider > numberChildInMoveBlock - 1) { return }

		widthForAnimate -= widthListItemForAnimate;
		$moveBlock.css({"transform": "translate(" + widthForAnimate + "px,0)",
			"-webkit-transition": "translate(" + widthForAnimate + "px,0)",
			"-moz-transition": "translate(" + widthForAnimate + "px,0)",
			"-o-transition": "translate(" + widthForAnimate + "px,0)"
		});

		currentPositionSlider++;

		if(currentPositionSlider > numberChildInMoveBlock - 1) {
			$nextBtn.addClass("comments__arrow-non-active");
		} else {
			$nextBtn.removeClass("comments__arrow-non-active");
		}

		if(currentPositionSlider !== 3) {
			$prevBtn.removeClass("comments__arrow-non-active");
		}

	}

	function movedPrev () {
		if(currentPositionSlider === 3) { return }

		widthForAnimate +=widthListItemForAnimate;
		$moveBlock.css({"transform": "translate(" + widthForAnimate + "px,0)",
			"-webkit-transition": "translate(" + widthForAnimate + "px,0)",
			"-moz-transition": "translate(" + widthForAnimate + "px,0)",
			"-o-transition": "translate(" + widthForAnimate + "px,0)"
		});

		currentPositionSlider--;

		if(currentPositionSlider === 3) {
			$prevBtn.addClass("comments__arrow-non-active");
		} else {
			$prevBtn.removeClass("comments__arrow-non-active");
		}

		if(currentPositionSlider > numberChildInMoveBlock - 1) {
			$nextBtn.addClass("comments__arrow-non-active");
		} else {
			$nextBtn.removeClass("comments__arrow-non-active");
		}
	}
}

function scrollPage() {
	var $aboutBtn = $(".nav__menu-item-about"),
			$aboutBlock = $(".about-us"),
			$commentsBtn = $(".nav__menu-item-comments"),
			$commentsBlock = $(".comments"),
			$tradingPlatformsBtn = $(".nav__menu-item-trading-platforms"),
			$tradingPlatformsBlock = $(".trading-platforms"),
			$contactsBtn = $(".nav__menu-item-contacts"),
			$contactsBlock = $(".footer");

	$aboutBtn.click(function() {
		$('html, body').animate({
			scrollTop: $aboutBlock.offset().top
		}, 1000);
		return false;
	});
	$commentsBtn.click(function() {
		$('html, body').animate({
			scrollTop: $commentsBlock.offset().top
		}, 1000);
		return false;
	});
	$tradingPlatformsBtn.click(function() {
		var extraMargin = 5;
		$('html, body').animate({
			scrollTop: $tradingPlatformsBlock.offset().top + extraMargin
		}, 1000);
		return false;
	});
	$contactsBtn.click(function() {
		$('html, body').animate({
			scrollTop: $contactsBlock.offset().top
		}, 1000);
		return false;
	});
}