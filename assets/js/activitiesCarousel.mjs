const LEFT_ARROW_BUTTON = document.getElementById('left-arrow-button');
const RIGHT_ARROW_BUTTON = document.getElementById('right-arrow-button');
const ACTIVITIES_CONTAINER = document.querySelector('.activities');
let ACTIVITY_CLIENT_WIDTH = 0;
let isScrollAllowed = true;

function getActivityClientWidthForCarouselSlide() {
  ACTIVITY_CLIENT_WIDTH =
    document.querySelectorAll('.activity')[0].clientWidth + 20;
}

function checkIfScrollIsDone() {
  let scrollLeftValues = [];

  for (let i = 0; i < ACTIVITIES_CONTAINER.children.length; i++) {
    scrollLeftValues.push(ACTIVITY_CLIENT_WIDTH * i);
  }

  for (let scrollLeftValue of scrollLeftValues) {
    if (scrollLeftValue === ACTIVITIES_CONTAINER.scrollLeft) {
      isScrollAllowed = true;
    }
  }
}

function checkArrowClassState(direction, newWidth, isNotScrolling = false) {
  if (isNotScrolling) {
    if (direction === 'left') {
      LEFT_ARROW_BUTTON.classList.remove('carousel-arrow-button--active');
    }

    if (direction === 'right') {
      RIGHT_ARROW_BUTTON.classList.remove('carousel-arrow-button--active');
    }

    return;
  }

  if (direction === 'none') {
    LEFT_ARROW_BUTTON.classList.remove('carousel-arrow-button--active');
    RIGHT_ARROW_BUTTON.classList.remove('carousel-arrow-button--active');
  }

  if (direction === 'left') {
    if (!newWidth) {
      LEFT_ARROW_BUTTON.classList.remove('carousel-arrow-button--active');
      RIGHT_ARROW_BUTTON.classList.add('carousel-arrow-button--active');
    } else {
      RIGHT_ARROW_BUTTON.classList.add('carousel-arrow-button--active');
    }
  }

  if (direction === 'right') {
    if (newWidth + ACTIVITY_CLIENT_WIDTH >= ACTIVITIES_CONTAINER.scrollWidth) {
      LEFT_ARROW_BUTTON.classList.add('carousel-arrow-button--active');

      RIGHT_ARROW_BUTTON.classList.remove('carousel-arrow-button--active');
    } else {
      LEFT_ARROW_BUTTON.classList.add('carousel-arrow-button--active');
    }
  }
}

function slideToTheLeft() {
  // 20 is the 20px gap in ACTIVITIES_CONTAINER
  let newWidth = ACTIVITIES_CONTAINER.scrollLeft - ACTIVITY_CLIENT_WIDTH;

  if (newWidth >= 0) {
    ACTIVITIES_CONTAINER.scrollTo(newWidth, 0);
  } // if ACTIVITIES_CONTAINER has more than 2 children, an else here will break the code

  checkArrowClassState('left', newWidth);
}

function slideToTheRight() {
  let newWidth = ACTIVITIES_CONTAINER.scrollLeft + ACTIVITY_CLIENT_WIDTH;

  if (newWidth < ACTIVITIES_CONTAINER.scrollWidth) {
    ACTIVITIES_CONTAINER.scrollTo(newWidth, 0);
  }

  checkArrowClassState('right', newWidth);
}

function handleSlideButtonClick(buttonId) {
  if (ACTIVITIES_CONTAINER.children.length === 1) {
    checkArrowClassState('none', 0);
    return;
  }

  buttonId = this?.id || buttonId;

  checkIfScrollIsDone();

  if (isScrollAllowed) {
    isScrollAllowed = false;

    buttonId.includes('left') ? slideToTheLeft() : slideToTheRight();
  }
}

document.querySelectorAll('.carousel-arrow-button').forEach(slideButton => {
  slideButton.addEventListener('click', handleSlideButtonClick);
});

window.onresize = getActivityClientWidthForCarouselSlide;

window.onkeydown = ({ key }) => {
  if (key === 'ArrowLeft') {
    handleSlideButtonClick('left');
  }

  if (key === 'ArrowRight') {
    handleSlideButtonClick('right');
  }
};

export {
  getActivityClientWidthForCarouselSlide,
  checkArrowClassState,
  slideToTheLeft,
  isScrollAllowed
};
