import { getPropData } from './layerMethods.mjs';

function addPropCodeInputListener(activityId) {
  document
    .getElementById(`${activityId}-title`)
    .addEventListener('input', ({ target }) => {
      let activityLayer = document.getElementById(activityId);
      let activityLayerH3 = activityLayer.firstElementChild;
      let h3Value =
        target.value.charAt(0).toUpperCase() +
        target.value.slice(1, target.value.length);

      let code_prop_title_input = document.getElementById(
        `${activityId}-code-prop`
      );

      if (!activityId.includes('p')) {
        if (target.value) {
          activityLayerH3.innerHTML = h3Value;

          code_prop_title_input.innerHTML = `"${target.value}"`;
        } else {
          activityLayerH3.innerHTML = `Activity ${activityLayer.id.replace(
            'a',
            ''
          )}`;

          code_prop_title_input.innerHTML = `"${activityId}"`;
        }
      } else {
        if (target.value) {
          activityLayerH3.innerHTML = h3Value;

          code_prop_title_input.innerHTML = `"${target.value}"`;
        } else {
          activityLayerH3.innerHTML = activityId.toUpperCase();

          code_prop_title_input.innerHTML = `"${activityId}"`;
        }
      }
    });

  document
    .getElementById(`${activityId}-content`)
    .addEventListener('input', ({ target }) => {
      let code_prop_content_textarea = document.getElementById(
        `${activityId}-code-value`
      );

      code_prop_content_textarea.innerHTML = `"${target.value}"`;
    });
}

function addActivityCode(activityId) {
  const ACTIVITIES_CODE_CONTAINER = document.getElementById('activities-code');

  ACTIVITIES_CODE_CONTAINER.innerHTML += `<span id="${activityId}-comma">,</span><span id="${activityId}-code">
    <span class="prop" id="${activityId}-code-prop">"${activityId}"</span>: <span class="value string" id="${activityId}-code-value">""</span></span>`;

  addPropCodeInputListener(activityId);
}

function sortActivitiesCode(activityId) {
  const ACTIVITIES_CONTAINER = document.querySelector('.activities');
  const ACTIVITIES_CODE_CONTAINER = document.getElementById('activities-code');
  const activityIndex = Number(activityId.replace('a', ''));

  for (
    let activityCodeIterator = activityIndex;
    activityCodeIterator <= ACTIVITIES_CONTAINER.children.length;
    activityCodeIterator++
  ) {
    const previousActivityId = `a${activityCodeIterator + 1}`;
    const activityCodeIndex = activityCodeIterator - 1;
    const activityCode = [...ACTIVITIES_CODE_CONTAINER.children].filter(
      activityCodeChild => activityCodeChild.id.includes('code')
    )[activityCodeIndex];

    const [activityCodeProp, activityCodeValue] = [
      ...activityCode.querySelectorAll('*')
    ];

    const activityComma = document.getElementById(
      `${previousActivityId}-comma`
    );

    activityComma.id = activityComma.id.replace(
      previousActivityId,
      `a${activityCodeIterator}`
    );
    activityCode.id = activityCode.id.replace(
      previousActivityId,
      `a${activityCodeIterator}`
    );
    activityCodeProp.id = activityCodeProp.id.replace(
      previousActivityId,
      `a${activityCodeIterator}`
    );
    activityCodeValue.id = activityCodeValue.id.replace(
      previousActivityId,
      `a${activityCodeIterator}`
    );

    if (activityCodeProp.innerHTML.includes(previousActivityId)) {
      activityCodeProp.innerHTML = `"a${activityCodeIterator}"`;
    }

    ACTIVITIES_CODE_CONTAINER.querySelectorAll('*').forEach(
      activityCodeChild => {
        if (activityCodeChild.id.includes(previousActivityId)) {
          activityCodeChild.id = activityCodeChild.id.replace(
            previousActivityId,
            `a${activityCodeIterator}`
          );
        }

        if (
          activityCodeChild.innerHTML.includes(`"${previousActivityId}`) &&
          activityCodeChild.classList.contains('prop')
        ) {
          activityCodeChild.innerHTML = activityCodeChild.innerHTML.replace(
            previousActivityId,
            `a${activityCodeIterator}`
          );
        }
      }
    );
  }
}

function removeActivityCode(activityId) {
  const ACTIVITIES_CODE_CONTAINER = document.getElementById('activities-code');
  const COMMA_ELEMENT = document.getElementById(`${activityId}-comma`);
  const CODE_ELEMENT = document.getElementById(`${activityId}-code`);

  ACTIVITIES_CODE_CONTAINER.removeChild(COMMA_ELEMENT);
  ACTIVITIES_CODE_CONTAINER.removeChild(CODE_ELEMENT);

  sortActivitiesCode(activityId);
}

function getIndentation(layerLevel) {
  const blankSpaceIncrement = '  ';
  let blankSpace = '';

  if (layerLevel > 1) {
    for (
      let blankSpaceIterator = 1;
      blankSpaceIterator < layerLevel;
      blankSpaceIterator++
    ) {
      blankSpace += blankSpaceIncrement;
    }
  }
  return blankSpace;
}

function togglePropLayerCode(
  previousLayerLevel,
  previousLayer,
  newLayer,
  newProp,
  isObject
) {
  const activityCodeValue = document.querySelector(
    `#${previousLayer}-code-value`
  );
  let blankSpace = getIndentation(previousLayerLevel);

  if (!isObject) {
    activityCodeValue.innerHTML = '""';

    activityCodeValue.classList.add('string');
    activityCodeValue.classList.remove('object');
  } else {
    activityCodeValue.innerHTML = `<span id="${previousLayer}-opening-curly-bracket">{</span><span id="${newLayer}-code">
      ${blankSpace}<span class="prop" id="${newProp}-code-prop">"${newProp}"</span>: <span class="value string" id="${newProp}-code-value">""</span></span>
    ${blankSpace}<span id="${previousLayer}-closing-curly-bracket">}</span>`;

    activityCodeValue.classList.remove('string');
    activityCodeValue.classList.add('object');
  }
}

function addPropCodeInPropLayer(previousPropLayer, newPropTitle) {
  const PROP_LAYER_CODE_CONTAINER = document.getElementById(
    `${previousPropLayer}-code`
  );
  let propLayers = previousPropLayer.match(/n[0-9]+/g);
  let previousLayerLevel = Number(
    propLayers[propLayers.length - 1].replace('n', '')
  );
  let blankSpace = getIndentation(previousLayerLevel);

  PROP_LAYER_CODE_CONTAINER.innerHTML += `<span id="${newPropTitle}-comma">,</span>
    ${blankSpace}<span class="prop" id="${newPropTitle}-code-prop">"${newPropTitle}"</span>: <span class="value string" id="${newPropTitle}-code-value">""</span>`;

  addPropCodeInputListener(newPropTitle);
}

function removePropCodeInPropLayer(activityId) {
  const PROP_COMMA = document.querySelector(`#${activityId}-comma`);
  const ACTIVITY_CODE_PROP = document.querySelector(`#${activityId}-code-prop`);
  const ACTIVITY_CODE_VALUE = document.querySelector(
    `#${activityId}-code-value`
  );

  const PROP_LAYER_CONTAINER = PROP_COMMA.parentElement;
  ACTIVITY_CODE_PROP?.nextSibling.remove();
  PROP_LAYER_CONTAINER.removeChild(PROP_COMMA);
  PROP_LAYER_CONTAINER.removeChild(ACTIVITY_CODE_PROP);
  PROP_LAYER_CONTAINER.removeChild(ACTIVITY_CODE_VALUE);

  if (PROP_LAYER_CONTAINER.lastChild?.data?.includes('\n')) {
    PROP_LAYER_CONTAINER.lastChild.remove();
  }

  const { newPropTitle: nextPropId } = getPropData(activityId);
  document
    .getElementById(`${nextPropId.toLowerCase()}-comma`)
    ?.previousSibling.remove();
}

function sortPropsCodeId(activityId) {
  let activityIdPMatches = activityId.match(/p[0-9]+/g);
  const propLayerId = activityId.slice(
    0,
    activityId.length - activityIdPMatches[activityIdPMatches.length - 1].length
  );
  const propLayer = document.getElementById(`${propLayerId}-code`);
  let deletedPropIndex = Number(
    activityIdPMatches[activityIdPMatches.length - 1].replace(/p/i, '')
  );
  let propLayerChildren = [
    ...document.querySelectorAll(`#${propLayer.id} > *`)
  ].filter(propLayerChildElement =>
    propLayerChildElement?.id.includes('code-value')
  );

  for (
    let propCodeIterator = deletedPropIndex;
    propCodeIterator <= propLayerChildren.length;
    propCodeIterator++
  ) {
    let propValueIndex = propCodeIterator - 1;
    let propValueId = propLayerChildren[propValueIndex].id.replace(
      '-code-value',
      ''
    );
    const ACTIVITY_CODE_COMMA = document.getElementById(`${propValueId}-comma`);
    const ACTIVITY_CODE_PROP = document.getElementById(
      `${propValueId}-code-prop`
    );

    let propValuePMatches = propValueId.match(/p[0-9]+/g);
    let propValuePIndexLength = propValuePMatches[
      propValuePMatches.length - 1
    ].replace(/p/i, '').length;

    let propValueIdWithoutPropNumber = propValueId.slice(
      0,
      propValueId.length - propValuePIndexLength
    );
    let propInput = document.getElementById(
      `${propValueIdWithoutPropNumber}${propCodeIterator}-title`
    );

    document
      .querySelectorAll(`#${propValueId}-code-value *`)
      .forEach(propElementInsidePropValue => {
        if (propElementInsidePropValue.id.includes(propValueId)) {
          propElementInsidePropValue.id = propElementInsidePropValue.id.replace(
            propValueId,
            `${propValueIdWithoutPropNumber}${propCodeIterator}`
          );
        }

        if (propElementInsidePropValue.id.includes('prop')) {
          propElementInsidePropValue.innerHTML =
            propElementInsidePropValue.innerHTML.replace(
              propValueId,
              `${propValueIdWithoutPropNumber}${propCodeIterator}`
            );
        }
      });

    if (ACTIVITY_CODE_PROP.innerHTML.includes(propValueId)) {
      ACTIVITY_CODE_PROP.innerHTML = `"${propValueIdWithoutPropNumber}${propCodeIterator}"`;
    }

    ACTIVITY_CODE_COMMA.id = `${propValueIdWithoutPropNumber}${propCodeIterator}-comma`;
    ACTIVITY_CODE_PROP.id = `${propValueIdWithoutPropNumber}${propCodeIterator}-code-prop`;
    propLayerChildren[
      propValueIndex
    ].id = `${propValueIdWithoutPropNumber}${propCodeIterator}-code-value`;

    propInput.replaceWith(propInput.cloneNode(true));

    addPropCodeInputListener(
      `${propValueIdWithoutPropNumber}${propCodeIterator}`
    );
  }
}

document
  .getElementById('activities-title')
  .addEventListener('input', ({ target }) => {
    if (target.value) {
      document.getElementById(
        'initial-title-code'
      ).innerHTML = `"${target.value}"`;
    } else {
      document.getElementById('initial-title-code').innerHTML =
        '"initialTitle"';
    }
  });

export {
  addPropCodeInputListener,
  addPropCodeInPropLayer,
  removePropCodeInPropLayer,
  sortPropsCodeId,
  addActivityCode,
  removeActivityCode,
  togglePropLayerCode
};
