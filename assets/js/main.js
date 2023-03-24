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

TOTAL_ACTIVITIES_AMOUNT.addEventListener('change', renderActivities);

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

ACTIVITIES_CONTENT.forEach(activity_content => {
  activity_content.addEventListener('input', resizeHeight);
});
