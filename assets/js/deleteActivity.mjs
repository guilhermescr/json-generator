import { checkArrowClassState, slideToTheLeft } from './activitiesCarousel.mjs';

function getAllActivities() {
  const ACTIVITIES_CONTAINER = document.querySelector('.activities');
  console.log(ACTIVITIES_CONTAINER.children.length);
}

function deleteActivity() {
  const ACTIVITIES_CONTAINER = document.querySelector('.activities');

  slideToTheLeft();

  let previousElement = this.parentElement.previousElementSibling;
  ACTIVITIES_CONTAINER.removeChild(this.parentElement);

  if (previousElement.id === ACTIVITIES_CONTAINER.lastElementChild.id) {
    checkArrowClassState('right', 0, true);
  }

  let activityElements = [];

  for (let activity of ACTIVITIES_CONTAINER.children) {
    if (activity.id !== 'a1') {
      [...document.querySelectorAll('*')].forEach(domElement => {
        domElement.getAttributeNames().map(attribute => {
          if (
            domElement.getAttribute(attribute).includes(activity.id) &&
            !activityElements.includes(domElement)
          ) {
            activityElements.push(domElement);
          }
        });
      });
    }
  }

  console.log(activityElements);
  // getAllActivities();
}

function addDeleteActivityListener() {
  document
    .querySelectorAll('.delete-activity-button')
    .forEach(deleteActivityButton => {
      deleteActivityButton.addEventListener('click', deleteActivity, {
        once: true
      });
    });
}

export { addDeleteActivityListener };
