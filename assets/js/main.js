import renderPropsLayer from './renderPropsLayers.mjs';

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

  if (this.id.includes('no')) {
    activity_content_container.classList.remove('hide');
  } else {
    activity_content_container.classList.add('hide');
    let updatedActivityIndex = activityIndex.replace(
      activityIndex.slice(activityIndex.search('-item')),
      ''
    );
    renderPropsLayer(updatedActivityIndex, layerLevel, 1);
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

function addMorePropsListener(activityIndex) {
  document
    .querySelectorAll(`input[name="${activityIndex}-item"]`)
    .forEach(morePropsInputRadio => {
      morePropsInputRadio.addEventListener('click', addPropsInActivity);
    });
}

document.body.onload = () => {
  addMorePropsListener('a1');
};

TOTAL_ACTIVITIES_AMOUNT.addEventListener('change', renderActivities);

ACTIVITIES_CONTENT.forEach(activity_content => {
  activity_content.addEventListener('input', resizeHeight);
});
