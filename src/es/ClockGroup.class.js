export class TrixClockGroup {
  /**
   * @type {string}
   * @private
   */
  _prefix;

  /**
   * @type {number}
   * @private
   */
  _zeroBasedSize;

  /**
   * @type {Element[]}
   * @private
   */
  _elements;

  constructor(prefix, size) {
    this._prefix = prefix;
    this._zeroBasedSize = size - 1;
    this._elements = Array.from(document.getElementsByClassName(this._prefix));
  }

  /**
   * @param {number} groupTimeValue
   */
  update(groupTimeValue) {
    // this.value = +groupTimeValue;
    TrixClockGroup._clear(this._elements);
    if (groupTimeValue === 0)
      return;

    let counter = 0;
    while (counter < groupTimeValue) {
      const index = TrixClockGroup._randomNumber(this._zeroBasedSize);
      const element = this._elements[index];
      if (element.classList.contains('active'))
        continue;
      element.classList.add('active');
      counter++;
    }
  }

  /**
   * @param {number} max
   * @returns {number}
   * @private
   */
  static _randomNumber(max) {
    return ~~(Math.random() * (max + 1));
  }

  /**
   * @param {Element[]} elements
   * @private
   */
  static _clear(elements) {
    for (let journey = 0; journey < elements.length; journey++)
      elements[journey].classList.remove('active');
  }
}
