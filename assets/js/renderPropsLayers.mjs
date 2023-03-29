import { addMoreItems } from './main.js';

function renderPropsLayer(
  activityIndex,
  newLayer,
  newLayerLevel,
  activityPropsContainer
) {
  const propsLayer = document.createElement('div');
  propsLayer.classList.add('activity-prop-levels');
  propsLayer.id = `${activityIndex}n${newLayerLevel}`;

  propsLayer.innerHTML = `
  <div id="${newLayer}">
    <h4>${newLayer.toUpperCase()}</h4>

    <div class="activity-title-container">
      <label for="${newLayer}-title">Title:</label>
      <input type="text" id="${newLayer}-title" class="activity-title" />
    </div>

    <div class="activity-moreItems-container">
      <label for="${newLayer}-moreItems">More items?</label>

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
    <span class="more-props-level">N2</span>
    Add more props +
  </button>
  `;

  activityPropsContainer.appendChild(propsLayer);
  addMoreItems(`${newLayer}`);
}

export default renderPropsLayer;
