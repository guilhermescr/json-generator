import { addMoreItems } from './main.js';

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

  /* a.localeCompare(b);
  - Determines whether two strings are equivalent in the current locale.
  | -1 if the string is sorted before the compareString
  | 0 if the two strings are equal
  | 1 if the string is sorted after the compareString
  */
  layersIds.sort((a, b) => a.localeCompare(b));

  let propLayers = getPropLayers(layersIds);

  // activity_props_container.innerHTML = '';
  const layersValues = [];
  let sortedLayersString = '';

  propLayers.forEach(propLayer => {
    sortedLayersString += `${propLayer.outerHTML}\n`;

    activity_props_container
      .querySelectorAll(`#${propLayer.id} > div`)
      .forEach(propContainer => {
        const layerValues = {
          activityTitle: {
            elementSelector: '.activity-title',
            value: propContainer.querySelector('.activity-title').value
          },
          moreItemsInput: {
            elementSelector: '',
            isContent: true,
            value: ''
          }
        };

        (function () {
          propContainer
            .querySelectorAll('input[type="radio"]')
            .forEach(moreItemsInputElement => {
              const { moreItemsInput } = layerValues;

              if (moreItemsInputElement.checked) {
                moreItemsInput.elementSelector = `#${moreItemsInputElement.id}`;

                moreItemsInput.isContent =
                  moreItemsInputElement.id.includes('no');

                if (moreItemsInput.isContent) {
                  moreItemsInput.value =
                    propContainer.querySelector('.activity-content').value;
                }
              }
            });
        })();

        layersValues.push(layerValues);
      });
  });

  activity_props_container.innerHTML = sortedLayersString;

  propLayers = getPropLayers(layersIds);

  let propIndex = 0;

  propLayers.forEach(propLayer => {
    activity_props_container
      .querySelectorAll(`#${propLayer.id} > div`)
      .forEach(propContainer => {
        const { activityTitle, moreItemsInput } = layersValues[propIndex];

        propContainer.querySelector(activityTitle.elementSelector).value =
          activityTitle.value;

        if (moreItemsInput.isContent) {
          propContainer.querySelector('.activity-content').value =
            moreItemsInput.value;
        } else {
          propContainer.querySelector(
            moreItemsInput.elementSelector
          ).checked = true;
        }

        addMoreItems(
          `${propContainer.querySelector('h4').innerHTML.toLowerCase()}`
        );
        ++propIndex;
      });
  });
}

export { getPreviousLayerLevel, sortLayers };
