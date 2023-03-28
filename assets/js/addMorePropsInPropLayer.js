import { addMoreItems, JSON_GENERATOR_CONTAINER } from './main.js';

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

  <div class="activity-title-container">
    <label for="${propName}-title">Title:</label>
    <input type="text" id="${propName}-title" class="activity-title" />
  </div>

  <div class="activity-moreItems-container">
    <label for="${propName}-moreItems">More items?</label>

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

  JSON_GENERATOR_CONTAINER.scrollTo(0, JSON_GENERATOR_CONTAINER.scrollHeight);
}

function addClickListenerToAddMorePropsButton() {
  document
    .querySelectorAll('.add-more-props-button')
    .forEach(addMorePropsButton => {
      addMorePropsButton.addEventListener('click', () => {
        let previousPropTitle =
          addMorePropsButton.previousElementSibling.children[0].innerHTML;

        let newPropNumber =
          Number(previousPropTitle.slice(previousPropTitle.length - 1)) + 1;

        let newPropTitle =
          previousPropTitle.slice(0, previousPropTitle.length - 1) +
          newPropNumber;

        addMorePropsInPropLayer(
          newPropTitle,
          addMorePropsButton.parentElement,
          addMorePropsButton
        );
      });
    });
}

export { addClickListenerToAddMorePropsButton };
