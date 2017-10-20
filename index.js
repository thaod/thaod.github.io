class Util {
  static createElementFromHtml(html) {
    const _el = document.createElement('div');
    _el.innerHTML = html;
    return _el.firstChild;
  }
}

class SlexyControlsComponent {
  constructor(idNo) {
    this.id = idNo;
    this._createElement();
  }

  _createElement() {
    const template = '<div class="row slexy__controls"></div>';
    this.el = Util.createElementFromHtml(template);
    this.el.appendChild(this._createAddSelectionEl());
    this.el.appendChild(this._createAddOptionEl());
  }

  _createAddSelectionEl() {
    const template = `<a class="slexy__control add-more-select">+ More selection</a>`;
    this.addSelectionEl = Util.createElementFromHtml(template);

    return this.addSelectionEl;
  }

  _createAddOptionEl() {
    const template = `<a class="slexy__control add-more-option">+ Other option</a>`;
    this.addOptionEl = Util.createElementFromHtml(template);

    return this.addOptionEl;
  }
}

class SlexyInputComponent {
  constructor(idNo) {
    this.id = idNo;
    this.isHidden = true;
    this._createElement();
  }

  show() {
    this.isHidden = false;
    this.el.classList.remove('hidden');
  }

  isValid() {
    return this.isHidden || this.inputEl.value;
  }

  _createElement() {
    const template = '<div class="row slexy__more-option hidden"></div>';
    this.el = Util.createElementFromHtml(template);
    this.el.appendChild(this._createLabelEl());
    this.el.appendChild(this._createInputEl());
  }

  _createInputEl() {
    const template = `<input class="slexy__input" type="text" id="more-option-${this.id}" name="more-option-${this.id}">`;
    this.inputEl = Util.createElementFromHtml(template);

    return this.inputEl;
  }

  _createLabelEl() {
    const template = `<label class="slexy__label" for="more-option-${this.id}">Other option</label>`;
    return Util.createElementFromHtml(template);
  }
}

class SlexySelectComponent {
  constructor(idNo) {
    this.id = idNo;
    this.options = [
      { value: -1, text: 'Choose your pet buddy' },
      { value: 1, text: 'Cat' },
      { value: 2, text: 'Dog' },
      { value: 3, text: 'Goldfish' },
    ];
    this.selectedOption = null;
    this._createElement();
  }

  isValid() {
    return this.selectedOption && this.selectedOption !== -1;
  }

  _createElement() {
    const template = '<div class="row slexy__selection"></div>';
    this.el = Util.createElementFromHtml(template);

    this.el.appendChild(this._createLabelEl());
    this.el.appendChild(this._createSelectEl());

    this.el.addEventListener('change', ($event) => {
      const selectEl = $event.target;
      this.selectedOption = this.options[selectEl.selectedIndex];
    });
  }

  _createSelectEl() {
    const selectTemplate = `<select class="slexy__select" id="pet-select-${this.id}" name="pet-select-${this.id}"></select>`;
    const selectEl = Util.createElementFromHtml(selectTemplate);

    this.options.forEach(function(opt) {
      const optionHTML = `<option value="${opt.value}">${opt.text}</option>`;
      selectEl.innerHTML += optionHTML;
    });

    return selectEl;
  }

  _createLabelEl() {
    const template = `<label class="slexy__label" for="pet-select-${this.id}">Your pet</label>`;
    return Util.createElementFromHtml(template);
  }
}
{/*  */}
class SlexyComponent {
  constructor(idNo) {
    this.id = idNo;
    this._createElement();
  }

  hasValue() {
    if (this.inputCmp.isHidden) {
      return this.selectCmp.isValid();
    } else {
      return this.inputCmp.isValid();
    }
  }

  showNote() {
    this.noteEl.classList.remove('hidden');
  }

  hideNote() {
    this.noteEl.classList.add('hidden');
  }

  _createElement() {
    const template = `<div class="slexy" id="slexy-${this.id}"></div>`;
    this.el = Util.createElementFromHtml(template);

    this.selectCmp = new SlexySelectComponent(this.id);
    this.el.appendChild(this.selectCmp.el);

    this.inputCmp = new SlexyInputComponent(this.id);
    this.el.appendChild(this.inputCmp.el);

    this.el.appendChild(this._createNoteEl());

    this.controlsCmp = new SlexyControlsComponent(this.id);
    this.el.appendChild(this.controlsCmp.el);
  }

  _createNoteEl() {
    const template = `<div class="row slexy__invalid-note hidden"><label>Please choose one from upper options or add your own with 'Other option'.</label></div>`;
    this.noteEl = Util.createElementFromHtml(template);
    return this.noteEl;
  }
}

class SlexiesListComponent {
  constructor() {
    this.el = document.getElementById('slexy-list');
    this.slexies = [];
  }

  addSlexy() {
    const slexy = this._createSlexy();
    this.slexies.push(slexy);
    this.el.appendChild(slexy.el);
  }

  _createSlexy() {
    const slexy = new SlexyComponent(this.slexies.length + 1);

    slexy.controlsCmp.addSelectionEl.addEventListener('click', ($event) => {
      if (slexy.hasValue()) {
        slexy.controlsCmp.el.classList.add('hidden');
        slexy.hideNote();

        // Add 1 more Slexy component to Slexies List
        this.addSlexy();
      } else {
        slexy.showNote();
      }
    });

    slexy.controlsCmp.addOptionEl.addEventListener('click', () => slexy.inputCmp.show());

    return slexy;
  }
}

(function runRightAway() {
  console.log("Let's slexy!");
  const slexiesList = new SlexiesListComponent();
  slexiesList.addSlexy();
})();
