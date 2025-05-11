class Heap {
  storage = [];
  compareFn = (firstElement, secondElement) => firstElement > secondElement;

  constructor({ compareFn, initialStorage } = {}) {
    if (compareFn) {
      this.compareFn = compareFn;
    }

    if (initialStorage) {
      for (let i = 0; i < initialStorage.length; i += 1) {
        this.push(initialStorage[i]);
      }
    }
  }

  getParentIndex(childIdx) {
    if (childIdx === 0) {
      return 0;
    }

    return Math.floor((childIdx - 1) / 2);
  }

  getChildIndexes(parentIdx) {
    const nextLeftIdx = parentIdx * 2 + 1;
    const nextRightIdx = parentIdx * 2 + 2;

    return [nextLeftIdx, nextRightIdx];
  }

  swap(firstIdx, secondIdx) {
    const firstTemp = this.storage[firstIdx];
    this.storage[firstIdx] = this.storage[secondIdx];
    this.storage[secondIdx] = firstTemp;
  }

  size() {
    return this.storage.length;
  }

  peek() {
    return this.storage[0] || null;
  }

  getStorage() {
    return this.storage;
  }

  push(el) {
    this.storage.push(el);
    let currentNewNumIdx = this.storage.length - 1;
    let parentNewNumIdx = this.getParentIndex(currentNewNumIdx);

    while (this.compareFn(this.storage[currentNewNumIdx], this.storage[parentNewNumIdx])) {
      this.swap(currentNewNumIdx, parentNewNumIdx);
      currentNewNumIdx = parentNewNumIdx;
      parentNewNumIdx = this.getParentIndex(currentNewNumIdx);
    }

    return el;
  }

  poll() {
    if (!this.storage.length) {
      return null;
    }

    const firstElement = this.storage[0];
    this.storage[0] = this.storage[this.size() - 1];
    this.storage.pop();

    let currentParentIdx = 0;
    let [leftChildIdx, rightChildIdx] = this.getChildIndexes(0);

    while (this.storage[leftChildIdx] !== undefined) {
      const maxChildIdx =
        this.storage[rightChildIdx] !== undefined &&
        this.compareFn(this.storage[rightChildIdx], this.storage[leftChildIdx])
          ? rightChildIdx
          : leftChildIdx;

      if (this.compareFn(this.storage[currentParentIdx], this.storage[maxChildIdx])) {
        break;
      }

      this.swap(currentParentIdx, maxChildIdx);
      currentParentIdx = maxChildIdx;
      [leftChildIdx, rightChildIdx] = this.getChildIndexes(currentParentIdx);
    }

    return firstElement;
  }
}
export default Heap;
