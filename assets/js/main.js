import {
  checkArrowClassState,
  getActivityClientWidthForCarouselSlide
} from './activitiesCarousel.mjs';
import { addClickListenerToAddMorePropsButton } from './addMorePropsInPropLayer.mjs';
import { addDeleteActivityListener } from './activitiesMethods.mjs';
import {
  getAllPropContainers,
  getPreviousLayerLevel,
  sortLayers
} from './layerMethods.mjs';
import renderPropsLayer from './renderPropsLayers.mjs';
import {
  addPropCodeInputListener,
  addActivityCode,
  togglePropLayerCode,
  removePropCodeInPropLayer,
  sortPropsCodeId
} from './jsonPreview.mjs';
import * as copyJSON from './copyJSON.mjs';

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

function removeChildrenProps(
  activity_props_container,
  previousLayer,
  newLayerLevel
) {
  let elementsToBeRemovedId = `${previousLayer}n${newLayerLevel}`;

  const { propLayers, propContainers } = getAllPropContainers(
    activity_props_container
  );

  activity_props_container.removeChild(
    document.getElementById(elementsToBeRemovedId)
  );

  propLayers.forEach(propLayer => {
    if (propLayer.id.includes(elementsToBeRemovedId))
      propLayer?.parentElement?.removeChild(propLayer);
  });

  propContainers.forEach(propContainer => {
    if (propContainer.id.includes(elementsToBeRemovedId))
      propContainer?.parentElement?.removeChild(propContainer);
  });
}

function addPropsInActivity() {
  const { name: activity } = this;
  const activityId = getActivityIndex(activity);

  const activity_content_container =
    this.parentElement.parentElement.parentElement.nextElementSibling;

  const activity_props_container = document
    .querySelector(`#${activityId}`)
    .querySelector('.activity-props');

  let previousLayer = activity.replace(
    activity.slice(activity.search('-item')),
    ''
  );
  let previousLayerLevel = getPreviousLayerLevel(previousLayer);

  let newLayerLevel = previousLayerLevel + 1;
  let newProp = `${previousLayer}n${newLayerLevel}p1`;

  if (
    this.id.includes('no') &&
    document.getElementById(`${previousLayer}n${newLayerLevel}`)
  ) {
    removeChildrenProps(activity_props_container, previousLayer, newLayerLevel);
    togglePropLayerCode(previousLayerLevel, previousLayer, '', newProp, false);

    if (!activity_props_container.children.length) {
      activity_props_container.classList.add('hide');
    }

    activity_content_container.classList.remove('hide');
  }

  if (document.getElementById(newProp) !== null) return;

  if (this.id.includes('yes')) {
    activity_content_container.classList.add('hide');
    activity_props_container.classList.remove('hide');

    renderPropsLayer(newProp, newLayerLevel, activity_props_container);
    setTimeout(() => {
      togglePropLayerCode(
        previousLayerLevel,
        previousLayer,
        `${previousLayer}n${newLayerLevel}`,
        newProp,
        true
      );
    }, 10);
  }

  if (newProp.includes('p')) {
    sortLayers(activity_props_container, newProp);
    addClickListenerToAddMorePropsButton();
    addDeletePropButtonListener();
  }
}

function removeAndSortPropsInActivity() {
  let propLayer = this.parentElement.parentElement;
  let propString = this.parentElement.id;
  let props = propString.match(/p[0-9]+/g);
  let deletedProp = props[props.length - 1];
  let deletedPropIndex = Number(deletedProp.replace('p', ''));
  let propWithEmptyP = propString.slice(
    0,
    propString.length - deletedProp.length + 1
  );

  propLayer.removeChild(this.parentElement);

  let propLayerChildren = [...propLayer.children].filter(propInPropLayer => {
    if (propInPropLayer instanceof HTMLDivElement) {
      return propInPropLayer;
    }
  });

  const activity_props_container = document.querySelector(
    `#${getActivityIndex(propLayerChildren[0].id)} .activity-props`
  );

  if (deletedPropIndex > propLayerChildren.length) {
    [...activity_props_container.children].forEach(activityPropLevels => {
      if (activityPropLevels.id.includes(propString)) {
        activityPropLevels.remove();
      }
    });
  }

  // this for() sorts the props
  for (
    let propIndexIterator = deletedPropIndex;
    propIndexIterator <= propLayerChildren.length;
    propIndexIterator++
  ) {
    let propLayerChildIndex = propIndexIterator - 1;
    let propContainer = propLayerChildren[propLayerChildIndex];
    let previousPropId = propContainer.id;
    propContainer.id = `${propWithEmptyP}${propIndexIterator}`;

    propContainer.querySelectorAll('*').forEach(propContainerChild => {
      propContainerChild.getAttributeNames().map(attribute => {
        let attributeValue = propContainerChild.getAttribute(attribute);

        if (attributeValue.includes(previousPropId)) {
          propContainerChild.setAttribute(
            attribute,
            attributeValue.replace(previousPropId, propContainer.id)
          );
        }

        if (attributeValue.includes(previousPropId.toUpperCase())) {
          propContainerChild.id = propContainer.id.toUpperCase();
        }
      });

      if (
        propContainerChild?.innerText?.includes(previousPropId.toUpperCase())
      ) {
        propContainerChild.innerHTML = `${propWithEmptyP.toUpperCase()}${propIndexIterator}`;
      }
    });

    const { propContainers } = getAllPropContainers(activity_props_container);
    propContainers.forEach(propContainersChild => {
      if (propContainersChild?.id?.includes(previousPropId)) {
        propContainersChild
          .querySelectorAll('*')
          .forEach(propContainerChild => {
            propContainerChild.getAttributeNames().map(attribute => {
              let attributeValue = propContainerChild.getAttribute(attribute);

              if (attributeValue.includes(previousPropId)) {
                propContainerChild.setAttribute(
                  attribute,
                  attributeValue.replace(previousPropId, propContainer.id)
                );
              }
            });

            if (
              propContainerChild?.innerText?.includes(
                previousPropId.toUpperCase()
              )
            ) {
              propContainerChild.innerHTML =
                propContainerChild.innerHTML.replace(
                  previousPropId.toUpperCase(),
                  `${propWithEmptyP.toUpperCase()}${propIndexIterator}`
                );
            }
          });
      }
    });
  }

  removePropCodeInPropLayer(propString);
  sortPropsCodeId(propString);
}

function addDeletePropButtonListener() {
  document.querySelectorAll('.delete-prop-button').forEach(deletePropButton => {
    deletePropButton.addEventListener('click', removeAndSortPropsInActivity);
  });
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

function addMoreItems(activityId) {
  document
    .querySelectorAll(`input[name="${activityId}-item"]`)
    .forEach(morePropsInputRadio => {
      morePropsInputRadio.addEventListener('click', addPropsInActivity);
    });

  ACTIVITIES_CONTENT.forEach(activity_content => {
    activity_content.addEventListener('input', resizeHeight);
  });
}

function getPropData(previousPropTitle) {
  let previousPropTitleNumbers = previousPropTitle.match(/p[0-9]+/gi);
  let latestPropIndex =
    previousPropTitleNumbers[previousPropTitleNumbers.length - 1];
  let previousPropTitleNumber = Number(latestPropIndex.replace(/p/i, ''));
  let newPropNumber = previousPropTitleNumber + 1;

  let previousPropLayer = `${previousPropTitle.slice(
    0,
    previousPropTitle.length - latestPropIndex.length
  )}`;

  let newPropTitle = `${previousPropLayer}P${newPropNumber}`;

  return {
    latestPropIndex,
    previousPropLayer,
    previousPropTitleNumber,
    newPropNumber,
    newPropTitle
  };
}

document.body.onload = () => {
  getActivityClientWidthForCarouselSlide();
  addMoreItems('a1');
  addPropCodeInputListener('a1');
};

ADD_ACTIVITY_BUTTON.addEventListener('click', addActivity);

export {
  addMoreItems,
  addDeletePropButtonListener,
  getActivityIndex,
  getPropData,
  JSON_GENERATOR_CONTAINER
};
