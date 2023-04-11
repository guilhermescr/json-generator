import { checkArrowClassState, slideToTheLeft } from './activitiesCarousel.mjs';
import { removeActivityCode } from './jsonPreview.mjs';

function sortActivitiesIndex(activityIndex) {
  const ACTIVITIES_CONTAINER = document.querySelector('.activities');

  for (
    let activityIndexIterator = activityIndex;
    activityIndexIterator <= ACTIVITIES_CONTAINER.children.length;
    activityIndexIterator++
  ) {
    let activitiesChildIndex = activityIndexIterator - 1;
    let activity = ACTIVITIES_CONTAINER.children[activitiesChildIndex];
    let previousActivityId = activity.id;
    activity.id = `a${activityIndexIterator}`;
    console.log(activity);

    activity.querySelectorAll('*').forEach(activityChildElement => {
      activityChildElement.getAttributeNames().map(attribute => {
        let attributeValue = activityChildElement.getAttribute(attribute);

        // h4 not found, fix it.
        if (attributeValue.includes(previousActivityId)) {
          activityChildElement.setAttribute(
            attribute,
            attributeValue.replace(previousActivityId, activity.id)
          );
        }
      });

      if (
        activityChildElement?.innerText?.includes('Activity') &&
        activityChildElement?.innerText.match(/[0-9]+/)
      ) {
        activityChildElement.innerHTML = `Activity ${activityIndexIterator}`;
      }

      if (activityChildElement.id.includes(previousActivityId.toUpperCase())) {
        activityChildElement.id = activityChildElement.id.replace(
          previousActivityId.toUpperCase(),
          `A${activityIndexIterator}`
        );
        activityChildElement.innerHTML = activityChildElement.id;
      }
    });
  }
}

function deleteActivity() {
  const ACTIVITIES_CONTAINER = document.querySelector('.activities');
  const activityId = this.parentElement.id;
  let activityIndex = Number(activityId.replace('a', ''));

  slideToTheLeft();

  let previousElement = this.parentElement.previousElementSibling;

  ACTIVITIES_CONTAINER.removeChild(this.parentElement);

  if (previousElement.id === ACTIVITIES_CONTAINER.lastElementChild.id) {
    checkArrowClassState('right', 0, true);
  }
  sortActivitiesIndex(activityIndex);
  removeActivityCode(activityId);
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
