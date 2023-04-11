import { getActivityClientWidthForCarouselSlide } from './activitiesCarousel.mjs';
import { addClickListenerToAddMorePropsButton } from './addMorePropsInPropLayer.mjs';
import { addActivity, getActivityIndex } from './activitiesMethods.mjs';
import {
  getAllPropContainers,
  getPreviousLayerLevel,
  sortLayers
} from './layerMethods.mjs';
import renderPropsLayer from './renderPropsLayers.mjs';
import {
  addPropCodeInputListener,
  togglePropLayerCode,
  removePropCodeInPropLayer,
  sortPropsCodeId
} from './jsonPreview.mjs';
import * as copyJSON from './copyJSON.mjs';

const JSON_GENERATOR_CONTAINER = document.getElementById('json-generator');
const ADD_ACTIVITY_BUTTON = document.getElementById('add-activities-button');
const ACTIVITIES_CONTENT = document.querySelectorAll('.activity-content');

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
  JSON_GENERATOR_CONTAINER
};
