import { checkArrowClassState, slideToTheLeft } from './activitiesCarousel.mjs';
import { addActivityCode, removeActivityCode } from './jsonPreview.mjs';
import { addMoreItems } from './main.js';

const ACTIVITIES_CONTAINER = document.querySelector('.activities');

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

    activity.querySelectorAll('*').forEach(activityChildElement => {
      activityChildElement.getAttributeNames().map(attribute => {
        let attributeValue = activityChildElement.getAttribute(attribute);

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

function addDeleteActivityListener() {
  document
    .querySelectorAll('.delete-activity-button')
    .forEach(deleteActivityButton => {
      deleteActivityButton.addEventListener('click', deleteActivity, {
        once: true
      });
    });
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

function addActivity() {
  const ACTIVITY = document.createElement('div');
  const ACTIVITY_INDEX = ACTIVITIES_CONTAINER.children.length + 1;
  ACTIVITY.classList.add('activity');
  ACTIVITY.id = `a${ACTIVITY_INDEX}`;

  ACTIVITY.innerHTML = `
    <h3>Activity ${ACTIVITY_INDEX}</h3>

    <button type="button" class="delete-button delete-activity-button">
    Delete Activity
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 485 485"
      xml:space="preserve"
    >
      <g>
        <g>
          <rect x="67.224" width="350.535" height="71.81" />
          <path
            d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447
                h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z"
          />
        </g>
      </g>
    </svg>
  </button>

    <div class="activity-title-container">
      <label for="a${ACTIVITY_INDEX}-title">Title:</label>
      <input type="text" id="a${ACTIVITY_INDEX}-title" class="activity-title" />
    </div>

    <div class="activity-moreItems-container">
      <label for="a${ACTIVITY_INDEX}-moreItems">Is Object?</label>

      <div class="more-items">
        <div>
          <label for="a${ACTIVITY_INDEX}-moreItems-no">No</label>
          <input type="radio" name="a${ACTIVITY_INDEX}-item" id="a${ACTIVITY_INDEX}-moreItems-no" checked />
        </div>

        <div>
          <label for="a${ACTIVITY_INDEX}-moreItems-yes">Yes</label>
          <input type="radio" name="a${ACTIVITY_INDEX}-item" id="a${ACTIVITY_INDEX}-moreItems-yes" />
        </div>
      </div>
    </div>

    <div class="activity-content-container">
      <label for="a${ACTIVITY_INDEX}-content">Content:</label>
      <textarea id="a${ACTIVITY_INDEX}-content" class="activity-content"></textarea>
    </div>

    <div class="activity-props hide"></div>
    `;

  ACTIVITIES_CONTAINER.appendChild(ACTIVITY);
  ACTIVITIES_CONTAINER.scrollTo(ACTIVITIES_CONTAINER.scrollWidth, 0);
  checkArrowClassState('right', ACTIVITIES_CONTAINER.scrollWidth);
  addMoreItems(`a${ACTIVITY_INDEX}`);
  addActivityCode(`a${ACTIVITY_INDEX}`);
  addDeleteActivityListener();
}

function getActivityIndex(activity) {
  activity = activity.match(/a[0-9]+/g);

  if (activity) return activity[0];
}

export { addActivity, getActivityIndex };
