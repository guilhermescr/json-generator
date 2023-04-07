import { addPropCodeInPropLayer } from './jsonPreview.mjs';
import {
  addDeletePropButtonListener,
  addMoreItems,
  getPropData
} from './main.js';

export default function addMorePropsInPropLayer(
  propName,
  propLayer,
  addMorePropsButton
) {
  propName = propName.toLowerCase();

  const newProp = document.createElement('div');
  newProp.id = propName;
  newProp.innerHTML = `
  <h4>${propName.toUpperCase()}</h4>

  <button type="button" class="delete-button delete-prop-button">
    Delete Prop
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
    <label for="${propName}-title">Title:</label>
    <input type="text" id="${propName}-title" class="activity-title" />
  </div>

  <div class="activity-moreItems-container">
    <label for="${propName}-moreItems">Is Object?</label>

    <div class="more-items">
      <div>
        <label for="${propName}-moreItems-no">No</label>
        <input
          type="radio"
          name="${propName}-item"
          id="${propName}-moreItems-no"
          checked
        />
      </div>

      <div>
        <label for="${propName}-moreItems-yes">Yes</label>
        <input
          type="radio"
          name="${propName}-item"
          id="${propName}-moreItems-yes"
        />
      </div>
    </div>
  </div>

  <div class="activity-content-container">
    <label for="${propName}-content">Content:</label>
    <textarea id="${propName}-content" class="activity-content"></textarea>
  </div>
  `;

  propLayer.insertBefore(newProp, addMorePropsButton);
  addMoreItems(`${propName}`);
  addDeletePropButtonListener();

  let activity_container =
    addMorePropsButton.parentElement.parentElement.parentElement;

  activity_container.scrollTo(0, activity_container.scrollHeight);
}

function handleAddMorePropsButtonClick() {
  let previousPropTitle = this.previousElementSibling.children[0].innerHTML;

  const { newPropTitle } = getPropData(previousPropTitle);

  addMorePropsInPropLayer(newPropTitle, this.parentElement, this);
  addPropCodeInPropLayer(
    previousPropTitle.toLowerCase(),
    newPropTitle.toLowerCase(),
    false
  );
}

function addClickListenerToAddMorePropsButton() {
  document
    .querySelectorAll('.add-more-props-button')
    .forEach(addMorePropsButton => {
      addMorePropsButton.addEventListener(
        'click',
        handleAddMorePropsButtonClick
      );
    });
}

export { addClickListenerToAddMorePropsButton };
