function renderPropsLayer(activityIndex, layerLevel, propIndex) {
  const propsLayer = document.createElement('div');
  propsLayer.classList.add('activity-prop-levels');
  propsLayer.id = `${activityIndex}-n${layerLevel}`;

  propsLayer.innerHTML = `
  <div id="${activityIndex}-n${layerLevel}-p${propIndex}">
    <h4>${activityIndex.toUpperCase()}N${layerLevel}P${propIndex}</h4>

    <div class="activity-title-container">
      <label for="${activityIndex}-n${layerLevel}-p${propIndex}-title">Title:</label>
      <input type="text" id="${activityIndex}-n${layerLevel}-p${propIndex}-title" class="activity-title" />
    </div>

    <div class="activity-moreItems-container">
      <label for="${activityIndex}-n${layerLevel}-p${propIndex}-moreItems">More items?</label>

      <div class="more-items">
        <div>
          <label for="${activityIndex}-n${layerLevel}-p${propIndex}-moreItems-no">No</label>
          <input
            type="radio"
            name="${activityIndex}-n${layerLevel}-p${propIndex}-item"
            id="${activityIndex}-n${layerLevel}-p${propIndex}-moreItems-no"
            checked
          />
        </div>

        <div>
          <label for="${activityIndex}-n${layerLevel}-p${propIndex}-moreItems-yes">Yes</label>
          <input
            type="radio"
            name="${activityIndex}-n${layerLevel}-p${propIndex}-item"
            id="${activityIndex}-n${layerLevel}-p${propIndex}-moreItems-yes"
          />
        </div>
      </div>
    </div>

    <div class="activity-content-container">
      <label for="${activityIndex}-n${layerLevel}-p${propIndex}-content">Content:</label>
      <textarea id="${activityIndex}-n${layerLevel}-p${propIndex}-content" class="activity-content"></textarea>
    </div>
  </div>

  <div class="more-props-container">
    <span class="more-props-level">N2</span>

    <button
      id="${activityIndex}-n${layerLevel}-add-more-props"
      class="add-more-props-button"
      type="button"
    >
      Add more props +
    </button>
  </div>
  `;

  document.querySelector('.activity-props').appendChild(propsLayer);
}

export default renderPropsLayer;
