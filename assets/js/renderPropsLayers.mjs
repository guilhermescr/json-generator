import { addMoreItems } from './main.js';

function renderPropsLayer(newLayer, newLayerLevel, activityPropsContainer) {
  const propsLayer = document.createElement('div');
  let propsInNewLayer = newLayer.match(/p[0-9]+/gi);
  let lastPropInNewLayer = propsInNewLayer[propsInNewLayer.length - 1];

  propsLayer.classList.add('activity-prop-levels');
  propsLayer.id = `${newLayer.slice(
    0,
    newLayer.length - lastPropInNewLayer.length
  )}`;

  propsLayer.innerHTML = `
  <div id="${newLayer}">
    <h4>${newLayer.toUpperCase()}</h4>

    <div class="activity-title-container">
      <label for="${newLayer}-title">Title:</label>
      <input type="text" id="${newLayer}-title" class="activity-title" />
    </div>

    <div class="activity-moreItems-container">
      <label for="${newLayer}-moreItems">Is Object?</label>

      <div class="more-items">
        <div>
          <label for="${newLayer}-moreItems-no">No</label>
          <input
            type="radio"
            name="${newLayer}-item"
            id="${newLayer}-moreItems-no"
            checked
          />
        </div>

        <div>
          <label for="${newLayer}-moreItems-yes">Yes</label>
          <input
            type="radio"
            name="${newLayer}-item"
            id="${newLayer}-moreItems-yes"
          />
        </div>
      </div>
    </div>

    <div class="activity-content-container">
      <label for="${newLayer}-content">Content:</label>
      <textarea id="${newLayer}-content" class="activity-content"></textarea>
    </div>
  </div>

  <button
    id="${newLayer}-add-more-props"
    class="add-more-props-button"
    type="button"
  >
    <span class="more-props-level">N${newLayerLevel}</span>
    Add more props +
  </button>
  `;

  activityPropsContainer.appendChild(propsLayer);
  addMoreItems(`${newLayer}`);
}

export default renderPropsLayer;
