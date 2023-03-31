import { addMoreItems } from './main.js';

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

  let activity_container =
    addMorePropsButton.parentElement.parentElement.parentElement;

  activity_container.scrollTo(0, activity_container.scrollHeight);
}

function addClickListenerToAddMorePropsButton() {
  document
    .querySelectorAll('.add-more-props-button')
    .forEach(addMorePropsButton => {
      addMorePropsButton.addEventListener('click', () => {
        let previousPropTitle =
          addMorePropsButton.previousElementSibling.children[0].innerHTML;

        let previousPropTitleNumbers = previousPropTitle.match(/p[0-9]+/gi);

        let latestPropIndex =
          previousPropTitleNumbers[previousPropTitleNumbers.length - 1];

        let previousPropTitleNumber = Number(latestPropIndex.replace(/p/i, ''));

        let newPropNumber = previousPropTitleNumber + 1;

        let newPropTitle = `${previousPropTitle.replace(
          latestPropIndex,
          ''
        )}P${newPropNumber}`;

        addMorePropsInPropLayer(
          newPropTitle,
          addMorePropsButton.parentElement,
          addMorePropsButton
        );
      });
    });
}

export { addClickListenerToAddMorePropsButton };
