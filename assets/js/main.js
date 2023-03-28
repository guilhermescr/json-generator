import { addClickListenerToAddMorePropsButton } from './addMorePropsInPropLayer.js';
import renderPropsLayer from './renderPropsLayers.mjs';

const JSON_GENERATOR_CONTAINER = document.getElementById('json-generator');
const TOTAL_ACTIVITIES_AMOUNT = document.getElementById('activitiesAmount');
const ACTIVITIES_CONTENT = document.querySelectorAll('.activity-content');
const ACTIVITIES_CONTAINER = document.querySelector('.activities');

function renderActivities() {
  let chosenAmountOfActivities = this.value;
  ACTIVITIES_CONTAINER.innerHTML = '';

  for (
    let activityIndex = 0;
    activityIndex < chosenAmountOfActivities;
    activityIndex++
  ) {
    const activity = document.createElement('div');
    activity.classList.add('activity');

    activity.innerHTML = `
    <h3>Activity ${activityIndex + 1}</h3>

    <div>
      <label for="activity${activityIndex + 1}-title">Title:</label>
      <input type="text" id="activity${
        activityIndex + 1
      }-title" class="activity-title" />
    </div>

    <div>
      <label for="activity${activityIndex + 1}-content">Content:</label>
      <textarea
        id="activity${activityIndex + 1}-content"
        class="activity-content"
      ></textarea>
    </div>
    `;
    ACTIVITIES_CONTAINER.appendChild(activity);
  }
}

function addPropsInActivity(e, layerLevel = 2) {
  const { name: activityIndex } = this;

  const activity_content_container =
    this.parentElement.parentElement.parentElement.nextElementSibling;

  const activity_props_container =
    this.parentElement.parentElement.parentElement.nextElementSibling
      .nextElementSibling;

  let updatedActivityIndex = activityIndex.replace(
    activityIndex.slice(activityIndex.search('-item')),
    ''
  );

  let propLayers = document.querySelectorAll('.activity-prop-levels');
  let activityLayerLevel = activityIndex.match(/n[0-9]+/g);
  let newestActivityLayerLevel =
    activityLayerLevel[activityLayerLevel.length - 1];

  let isNewLayer = false;

  if (!propLayers.length) {
    isNewLayer = true;
  } else {
    propLayers.forEach(activity_prop_level => {
      if (!activity_prop_level.id.includes(newestActivityLayerLevel)) {
      }
    });
  }

  if (this.id.includes('no')) {
    activity_content_container.classList.remove('hide');
    console.log(activityIndex);
  } else {
    activity_content_container.classList.add('hide');

    if (isNewLayer) {
      renderPropsLayer(updatedActivityIndex, layerLevel, 1);
    }

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
  addMoreItems('a1n1');
};

TOTAL_ACTIVITIES_AMOUNT.addEventListener('change', renderActivities);

ACTIVITIES_CONTENT.forEach(activity_content => {
  activity_content.addEventListener('input', resizeHeight);
});

export { addMoreItems, JSON_GENERATOR_CONTAINER };
