import { checkArrowClassState, slideToTheLeft } from './activitiesCarousel.mjs';

function getAllActivities() {
  const ACTIVITIES_CONTAINER = document.querySelector('.activities');
  console.log(ACTIVITIES_CONTAINER.children.length);
}

function sortActivitiesIndex(activityIndex) {
  const ACTIVITIES_CONTAINER = document.querySelector('.activities');

  for (
    let activityIndexIterator = activityIndex;
    activityIndexIterator <= ACTIVITIES_CONTAINER.children.length;
    activityIndexIterator++
  ) {
    let activitiesChildIndex = activityIndexIterator - 1;
    let activity = ACTIVITIES_CONTAINER.children[activitiesChildIndex];
    let previousActivityIndex = activity.id;
    activity.id = `a${activityIndexIterator}`;

    activity.querySelectorAll('*').forEach(activityChildElement => {
      activityChildElement.getAttributeNames().map(attribute => {
        let attributeValue = activityChildElement.getAttribute(attribute);

        if (attributeValue.includes(previousActivityIndex)) {
          activityChildElement.setAttribute(
            attribute,
            attributeValue.replace(previousActivityIndex, activity.id)
          );
        }
      });

      if (
        activityChildElement?.innerText?.includes('Activity') &&
        activityChildElement?.innerText.match(/[0-9]+/)
      ) {
        activityChildElement.innerHTML = `Activity ${activityIndexIterator}`;
      }
    });
  }
}

function deleteActivity() {
  const ACTIVITIES_CONTAINER = document.querySelector('.activities');
  let activityIndex = Number(this.parentElement.id.replace('a', ''));

  slideToTheLeft();

  let previousElement = this.parentElement.previousElementSibling;
  ACTIVITIES_CONTAINER.removeChild(this.parentElement);

  if (previousElement.id === ACTIVITIES_CONTAINER.lastElementChild.id) {
    checkArrowClassState('right', 0, true);
  }
  sortActivitiesIndex(activityIndex);
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
