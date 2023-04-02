import { addMoreItems } from './main.js';
import { addClickListenerToAddMorePropsButton } from './addMorePropsInPropLayer.mjs';

function getPreviousLayerLevel(layerLevel) {
  let layerLevels = layerLevel.match(/n[0-9]+/g);

  if (layerLevels)
    return Number(layerLevels[layerLevels.length - 1].replace('n', ''));
  else return 1;
}

function getPropLayers(layersIds) {
  let propLayers = [];

  layersIds.forEach(layerId => {
    const propLayer = document.getElementById(layerId);
    propLayer && propLayers.push(propLayer);
  });
  return propLayers;
}

function sortLayers(activity_props_container) {
  const layersIds = [...activity_props_container.children].map(
    layer => layer.id
  );
  let propLayers;

  /* a.localeCompare(b);
  - Determines whether two strings are equivalent in the current locale.
  | -1 if the string is sorted before the compareString
  | 0 if the two strings are equal
  | 1 if the string is sorted after the compareString
  */
  layersIds.sort((a, b) => a.localeCompare(b));

  propLayers = getPropLayers(layersIds);

  // activity_props_container.innerHTML = '';
  const layersValues = [];
  let newPropsContainerDivs = '';

  propLayers.map(propLayer => {
    const layerValues = {
      activityTitle: {
        elementSelector: '.activity-title',
        value: propLayer.querySelector('.activity-title').value
      },
      moreItemsInput: {
        elementSelector: '',
        isContent: true,
        value: ''
      }
    };

    (function () {
      propLayer
        .querySelectorAll('input[type="radio"]')
        .forEach(moreItemsInputElement => {
          const { moreItemsInput } = layerValues;

          if (
            moreItemsInputElement.id.includes('no') &&
            moreItemsInputElement.checked
          ) {
            moreItemsInput.elementSelector = `#${moreItemsInputElement.id}`;

            moreItemsInput.isContent = true;

            moreItemsInput.value =
              propLayer.querySelector('.activity-content').value;
          }

          if (
            moreItemsInputElement.id.includes('yes') &&
            moreItemsInputElement.checked
          ) {
            moreItemsInput.elementSelector = `#${moreItemsInputElement.id}`;

            moreItemsInput.isContent = false;
          }
        });
    })();

    layersValues.push(layerValues);
    newPropsContainerDivs += `
    ${propLayer.outerHTML}
    `;
  });
  console.log(layersValues);

  activity_props_container.innerHTML = newPropsContainerDivs;

  propLayers = getPropLayers(layersIds);

  layersValues.forEach((layerValues, index) => {
    const { activityTitle, moreItemsInput } = layerValues;

    propLayers[index].querySelector(activityTitle.elementSelector).value =
      activityTitle.value;

    if (moreItemsInput.isContent) {
      propLayers[index].querySelector(moreItemsInput.elementSelector).value =
        moreItemsInput.value;
    } else {
      propLayers[index].querySelector(
        moreItemsInput.elementSelector
      ).checked = true;
    }

    addMoreItems(
      `${propLayers[index].querySelector('h4').innerHTML.toLowerCase()}`
    );
    addClickListenerToAddMorePropsButton();
  });
}

export { getPreviousLayerLevel, sortLayers };
