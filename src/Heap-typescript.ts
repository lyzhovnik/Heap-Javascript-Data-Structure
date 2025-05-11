// eslint-disable-next-line max-classes-per-file
type CompareFn<T> = (firstElement: T, secondElement: T) => boolean;

const getDefaultCompareFn =
  <T>(): CompareFn<T> =>
  (firstElement, secondElement) =>
    firstElement > secondElement;

type DefaultOptions<ElementType> = {
  initialStorage?: ElementType[];
  compareFn?: CompareFn<ElementType>;
};
abstract class HeapAbstract<ElementType> {
  protected storage: ElementType[] = [];
  protected compareFn: CompareFn<ElementType>;

  constructor({ compareFn, initialStorage }: DefaultOptions<ElementType> = {}) {
    if (compareFn) {
      this.compareFn = compareFn;
    } else {
      this.compareFn = getDefaultCompareFn<ElementType>();
    }

    if (initialStorage) {
      for (let i = 0; i < initialStorage.length; i += 1) {
        this.push(initialStorage[i]);
      }
    }
  }

  protected getParentIndex(childIdx: number): number {
    if (childIdx === 0) {
      return 0;
    }

    return Math.floor((childIdx - 1) / 2);
  }

  protected getChildIndexes(parentIdx: number): number[] {
    const nextLeftIdx = parentIdx * 2 + 1;
    const nextRightIdx = parentIdx * 2 + 2;

    return [nextLeftIdx, nextRightIdx];
  }

  protected swap(firstIdx: number, secondIdx: number) {
    const firstTemp = this.storage[firstIdx];
    this.storage[firstIdx] = this.storage[secondIdx];
    this.storage[secondIdx] = firstTemp;
  }

  public size(): number {
    return this.storage.length;
  }

  public peek(): ElementType | null {
    return this.storage[0] || null;
  }

  public getStorage(): ElementType[] {
    return this.storage;
  }

  abstract poll(): ElementType | null;

  abstract push(el: ElementType): ElementType;
}

class Heap<ElementType = number> extends HeapAbstract<ElementType> {
  public push(el: ElementType): ElementType {
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

  public poll(): ElementType | null {
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
