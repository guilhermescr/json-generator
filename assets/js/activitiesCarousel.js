const LEFT_ARROW_BUTTON = document.getElementById('left-arrow-button');
const RIGHT_ARROW_BUTTON = document.getElementById('right-arrow-button');
const ACTIVITIES_CONTAINER = document.querySelector('.activities');
let ACTIVITY_CLIENT_WIDTH = 0;
let isScrollAllowed = true;

function getActivityClientWidthForCarouselSlide() {
  ACTIVITY_CLIENT_WIDTH = document.querySelectorAll('.activity')[0].clientWidth;
}

function checkIfScrollIsAllowed(scrollTimes = 0) {
  let scrollLeftBase =
    ACTIVITIES_CONTAINER.scrollWidth / ACTIVITIES_CONTAINER.children.length +
    10;

  for (
    scrollTimes;
    scrollTimes < ACTIVITIES_CONTAINER.children.length;
    scrollTimes++
  ) {
    console.log(
      scrollLeftBase * scrollTimes,
      ACTIVITIES_CONTAINER.scrollLeft,
      scrollLeftBase * scrollTimes === ACTIVITIES_CONTAINER.scrollLeft
    );

    // isScrollAllowed =
    //   scrollLeftBase * scrollTimes === ACTIVITIES_CONTAINER.scrollLeft;
  }
}

function checkArrowClassState(direction, newWidth) {
  if (direction === 'left') {
    if (!newWidth) {
      LEFT_ARROW_BUTTON.classList.remove('carousel-arrow-button--active');
      RIGHT_ARROW_BUTTON.classList.add('carousel-arrow-button--active');
    } else {
      RIGHT_ARROW_BUTTON.classList.add('carousel-arrow-button--active');
    }
  }

  if (direction === 'right') {
    if (
      newWidth + ACTIVITY_CLIENT_WIDTH + 20 >=
      ACTIVITIES_CONTAINER.scrollWidth
    ) {
      LEFT_ARROW_BUTTON.classList.add('carousel-arrow-button--active');

      RIGHT_ARROW_BUTTON.classList.remove('carousel-arrow-button--active');
    } else {
      LEFT_ARROW_BUTTON.classList.add('carousel-arrow-button--active');
    }
  }
}

function slideToTheLeft() {
  // 20 is the 20px gap in ACTIVITIES_CONTAINER
  let newWidth = ACTIVITIES_CONTAINER.scrollLeft - (ACTIVITY_CLIENT_WIDTH + 20);

  checkIfScrollIsAllowed();
  if (!isScrollAllowed) return;

  if (newWidth >= 0) {
    ACTIVITIES_CONTAINER.scrollTo(newWidth, 0);
  } // if ACTIVITIES_CONTAINER has more than 2 children, an else here will break the code

  checkArrowClassState('left', newWidth);
}

function slideToTheRight() {
  let newWidth = ACTIVITIES_CONTAINER.scrollLeft + ACTIVITY_CLIENT_WIDTH + 20;

  checkIfScrollIsAllowed();
  if (!isScrollAllowed) return;

  if (newWidth < ACTIVITIES_CONTAINER.scrollWidth) {
    ACTIVITIES_CONTAINER.scrollTo(newWidth, 0);
  }

  checkArrowClassState('right', newWidth);
}

LEFT_ARROW_BUTTON.addEventListener('click', slideToTheLeft);
RIGHT_ARROW_BUTTON.addEventListener('click', slideToTheRight);

window.onresize = getActivityClientWidthForCarouselSlide;

export { getActivityClientWidthForCarouselSlide, checkArrowClassState };
