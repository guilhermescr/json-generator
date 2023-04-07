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

function addActivityCode(activityId, isObject, value) {
  const ACTIVITIES_CODE_CONTAINER = document.getElementById('activities-code');

  if (!isObject) {
    ACTIVITIES_CODE_CONTAINER.innerHTML += `<span id="${activityId}-comma">,</span>
    <span id="${activityId}-code"><span class="prop" id="${activityId}-code-prop">"${activityId}"</span>: <span class="value string" id="${activityId}-code-value">"${value}"</span></span>`;
  } else {
    ACTIVITIES_CODE_CONTAINER.innerHTML = `<span id="${activityId}-comma">,</span>
    <span id="${activityId}-code"><span class="prop" id="${activityId}-code-prop">"${activityId}"</span>: {
      <span class="prop">"a1n2p1"</span>: <span class="value string">""</span></span>
  }`;
  }

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
    activityCodeValue.innerHTML = `{<span id="${newProp}-code">
      ${blankSpace}<span class="prop" id="${newProp}-code-prop">"${newProp}"</span>: <span class="value string" id="${newProp}-code-value">""</span>
    ${blankSpace}</span>}`;

    activityCodeValue.classList.remove('string');
    activityCodeValue.classList.add('object');
    addPropCodeInputListener(newProp);
  }
}

function addPropCodeInPropLayer(propLayer, newPropTitle, isObject) {
  /*
  let previousLayerLevel = getPreviousLayerLevel(propLayer);
  let blankSpace = getIndentation(previousLayerLevel);
  */

  const PROP_LAYER_CODE_CONTAINER = document.getElementById(
    `${propLayer}-code`
  ).parentElement;

  console.log(PROP_LAYER_CODE_CONTAINER, newPropTitle);

  //${blankSpace}
  let value = '';

  if (!isObject) {
    PROP_LAYER_CODE_CONTAINER.innerHTML += `<span id="${newPropTitle}-comma">,</span>
    <span id="${newPropTitle}-code"><span class="prop" id="${newPropTitle}-code-prop">"${newPropTitle}"</span>: <span class="value string" id="${newPropTitle}-code-value">"${value}"</span></span>`;
  } /* else {
    PROP_LAYER_CODE_CONTAINER.innerHTML = `<span id="${propLayer}-comma">,</span>
    <span id="${propLayer}-code"><span class="prop" id="${propLayer}-code-prop">"${propLayer}"</span>: {
      <span class="prop">"a1n2p1"</span>: <span class="value string">""</span></span>
  }`;
  }
  */

  return;
  addPropCodeInputListener(activityId);
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
  addActivityCode,
  removeActivityCode,
  togglePropLayerCode
};
