import {
  checkArrowClassState,
  getActivityClientWidthForCarouselSlide
} from './activitiesCarousel.js';
import { addClickListenerToAddMorePropsButton } from './addMorePropsInPropLayer.js';
import { getPreviousLayerLevel } from './layerMethods.mjs';
import renderPropsLayer from './renderPropsLayers.mjs';

const JSON_GENERATOR_CONTAINER = document.getElementById('json-generator');
const ADD_ACTIVITY_BUTTON = document.getElementById('add-activities-button');
const ACTIVITIES_CONTAINER = document.querySelector('.activities');
const ACTIVITIES_CONTENT = document.querySelectorAll('.activity-content');

function addActivity() {
  const ACTIVITY = document.createElement('div');
  const ACTIVITY_INDEX = ACTIVITIES_CONTAINER.children.length + 1;
  ACTIVITY.classList.add('activity');
  ACTIVITY.id = `a${ACTIVITY_INDEX}`;

  ACTIVITY.innerHTML = `
    <h3>Activity ${ACTIVITY_INDEX}</h3>

    <div class="activity-title-container">
      <label for="a${ACTIVITY_INDEX}-title">Title:</label>
      <input type="text" id="a${ACTIVITY_INDEX}-title" class="activity-title" />
    </div>

    <div class="activity-moreItems-container">
      <label for="a${ACTIVITY_INDEX}-moreItems">More items?</label>

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
}

function getActivityIndex(activity) {
  activity = activity.match(/a[0-9]+/g);

  if (activity) return activity[0];
}

function addPropsInActivity() {
  const { name: activity } = this;
  const activityIndex = getActivityIndex(activity);

  const activity_content_container =
    this.parentElement.parentElement.parentElement.nextElementSibling;

  const activity_props_container = document
    .querySelector(`#${activityIndex}`)
    .querySelector('.activity-props');

  let previousLayer = activity.replace(
    activity.slice(activity.search('-item')),
    ''
  );
  let previousLayerLevel = getPreviousLayerLevel(previousLayer);

  let newLayerLevel = previousLayerLevel + 1;
  let newLayer = `${previousLayer}n${newLayerLevel}p1`;

  if (this.id.includes('no')) {
    let elementsToBeRemovedId = `${activityIndex}n${newLayerLevel}`;

    let elementsToBeRemoved = [...activity_props_container.children].filter(
      activityPropsChild => activityPropsChild.id === elementsToBeRemovedId
    );

    activity_props_container.removeChild(elementsToBeRemoved[0]);
    activity_content_container.classList.remove('hide');
  } else {
    activity_content_container.classList.add('hide');
    activity_props_container.classList.remove('hide');

    renderPropsLayer(
      getActivityIndex(activity),
      newLayer,
      newLayerLevel,
      activity_props_container
    );

    addClickListenerToAddMorePropsButton();
  }
}

function resizeHeight() {
  const root = document.querySelector(':root');

  if (this.value.length) {
    root.style.setProperty('--activity-content-height', '5px');
    root.style.setProperty(
      '--activity-content-height',
      `${this.scrollHeight}px`
    );
  } else {
    root.style.setProperty('--activity-content-height', 'auto');
  }
}

function addMoreItems(activityIndex) {
  document
    .querySelectorAll(`input[name="${activityIndex}-item"]`)
    .forEach(morePropsInputRadio => {
      morePropsInputRadio.addEventListener('click', addPropsInActivity);
    });
}

document.body.onload = () => {
  getActivityClientWidthForCarouselSlide();
  addMoreItems('a1');
  addMoreItems('a2');
};

ADD_ACTIVITY_BUTTON.addEventListener('click', addActivity);

ACTIVITIES_CONTENT.forEach(activity_content => {
  activity_content.addEventListener('input', resizeHeight);
});

export { addMoreItems, JSON_GENERATOR_CONTAINER };
