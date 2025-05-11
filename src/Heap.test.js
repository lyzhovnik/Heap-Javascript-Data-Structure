import { describe, expect, test } from '@jest/globals';
// import Heap from './Heap';
import Heap from './Heap';

describe('Heap implementation', () => {
  test('should create an empty max heap', () => {
    const maxHeap = new Heap();
    expect(maxHeap.size()).toBe(0);
    expect(maxHeap.peek()).toBe(null);
  });

  test('should create a heap with an initial array', () => {
    const maxHeap = new Heap({
      initialStorage: [5, 11, 2, 3, 77, 1],
    });

    expect(maxHeap.getStorage()).toEqual([77, 11, 2, 3, 5, 1]);
  });

  test('should create an empty heap', () => {
    const minHeap = new Heap();
    expect(minHeap.size()).toBe(0);
    expect(minHeap.peek()).toBe(null);
  });

  test('should push elements to the heap and maintain the heap properly', () => {
    const maxHeap = new Heap();
    maxHeap.push(5);
    maxHeap.push(3);
    maxHeap.push(8);

    expect(maxHeap.size()).toBe(3);
    expect(maxHeap.peek()).toBe(8);
    expect(maxHeap.getStorage()).toEqual([8, 3, 5]);

    maxHeap.push(10);

    expect(maxHeap.getStorage()).toEqual([10, 8, 5, 3]);
  });

  test('should poll elements from the heap and maintain the heap properly', () => {
    const maxHeap = new Heap();
    maxHeap.push(5);
    maxHeap.push(3);
    maxHeap.push(8);

    expect(maxHeap.poll()).toBe(8);
    expect(maxHeap.size()).toBe(2);
    expect(maxHeap.peek()).toBe(5);
    expect(maxHeap.getStorage()).toEqual([5, 3]);

    maxHeap.push(11);
    expect(maxHeap.getStorage()).toEqual([11, 3, 5]);

    maxHeap.push(2);
    expect(maxHeap.getStorage()).toEqual([11, 3, 5, 2]);

    const maxHeap2 = new Heap({ initialStorage: [7, 5, 6, 9, 10, 5] });

    expect(maxHeap2.poll()).toBe(10); // [7,5,6,9,5]
    expect(maxHeap2.poll()).toBe(9); // [7,5,6,5]
    maxHeap2.push(1); // [7,5,6,5, 1]
    expect(maxHeap2.poll()).toBe(7); // [5,6,5, 1]
    expect(maxHeap2.poll()).toBe(6); // [5,5, 1]
    maxHeap2.push(1); // [5,5, 1, 1]
    expect(maxHeap2.poll()).toBe(5); // [5, 1, 1]
    expect(maxHeap2.poll()).toBe(5); // [1]

    expect(maxHeap2.poll()).toBe(1); // [1, 1]
    expect(maxHeap2.poll()).toBe(1); // []
    expect(maxHeap2.size()).toBe(0);
  });

  test('should poll elements from the heap till the heap is empty', () => {
    const maxHeap = new Heap();
    maxHeap.push(5);
    maxHeap.push(3);
    maxHeap.push(8);

    expect(maxHeap.poll()).toBe(8);
    expect(maxHeap.size()).toBe(2);
    expect(maxHeap.peek()).toBe(5);
    expect(maxHeap.getStorage()).toEqual([5, 3]);

    maxHeap.push(11);
    expect(maxHeap.getStorage()).toEqual([11, 3, 5]);

    expect(maxHeap.poll()).toBe(11);
    expect(maxHeap.poll()).toBe(5);
    expect(maxHeap.poll()).toBe(3);
    expect(maxHeap.poll()).toBe(null);
    expect(maxHeap.size()).toBe(0);
  });
});

describe('MinHeap with custom compare func', () => {
  test('should create an empty min heap', () => {
    const minHeap = new Heap({ compareFn: (a, b) => a < b });
    expect(minHeap.size()).toBe(0);
    expect(minHeap.peek()).toBe(null);
  });

  test('should create an heap with an initial array', () => {
    const minHeap = new Heap({
      initialStorage: [5, 11, 2, 3, 77, 1],
      compareFn: (a, b) => a < b,
    });

    // [5]
    // [5, 11]
    // [5, 11, 2]
    // [2, 11, 5]
    // [2, 11, 5, 3]
    // [2, 3, 5, 11]
    // [2, 3, 5, 11, 77]
    // [2, 3, 5, 11, 77, 1]
    // [2, 3, 1, 11, 77, 5]
    // [1, 3, 2, 11, 77, 5]
    expect(minHeap.getStorage()).toEqual([1, 3, 2, 11, 77, 5]);
  });

  test('should push elements to the min heap and maintain the heap properly', () => {
    const minHeap = new Heap({ compareFn: (a, b) => a < b });
    minHeap.push(5);
    minHeap.push(3);
    minHeap.push(8);

    expect(minHeap.size()).toBe(3);
    expect(minHeap.peek()).toBe(3);
    expect(minHeap.getStorage()).toEqual([3, 5, 8]);

    minHeap.push(1);
    expect(minHeap.getStorage()).toEqual([1, 3, 8, 5]);

    // [1, 3, 8, 5]
    // [1, 3, 8, 5, 4]
    // [1, 3, 8, 5, 4]
    minHeap.push(4);
    expect(minHeap.getStorage()).toEqual([1, 3, 8, 5, 4]);
  });

  test('should poll elements from min heap and maintain the heap property', () => {
    const minHeap = new Heap({ compareFn: (a, b) => a < b });
    minHeap.push(5);
    minHeap.push(3);
    minHeap.push(8);

    expect(minHeap.getStorage()).toEqual([3, 5, 8]);
    expect(minHeap.poll()).toBe(3);
    expect(minHeap.size()).toBe(2);
    expect(minHeap.peek()).toBe(5);
    expect(minHeap.getStorage()).toEqual([5, 8]);

    minHeap.push(1);
    expect(minHeap.getStorage()).toEqual([1, 8, 5]);

    minHeap.push(11);
    expect(minHeap.getStorage()).toEqual([1, 8, 5, 11]);

    minHeap.push(3);
    expect(minHeap.getStorage()).toEqual([1, 3, 5, 11, 8]);

    expect(minHeap.poll()).toBe(1);
    // [1, 3, 5, 11, 8]
    // [3, 8, 5, 11]
    expect(minHeap.getStorage()).toEqual([3, 8, 5, 11]);

    const minHeap2 = new Heap({ compareFn: (a, b) => a < b });
    minHeap2.push(0);
    minHeap2.push(-1);
    minHeap2.push(1);
    expect(minHeap2.getStorage()).toEqual([-1, 0, 1]);

    expect(minHeap2.poll()).toBe(-1);
    expect(minHeap2.getStorage()).toEqual([0, 1]);
  });

  test('should poll elements from min heap till empty heap', () => {
    const minHeap = new Heap({ compareFn: (a, b) => a < b });
    minHeap.push(5);
    minHeap.push(3);
    minHeap.push(8);

    expect(minHeap.poll()).toBe(3);
    expect(minHeap.size()).toBe(2);
    expect(minHeap.peek()).toBe(5);
    expect(minHeap.getStorage()).toEqual([5, 8]);

    minHeap.push(11);
    expect(minHeap.getStorage()).toEqual([5, 8, 11]);

    expect(minHeap.poll()).toBe(5);
    expect(minHeap.poll()).toBe(8);
    expect(minHeap.poll()).toBe(11);
    expect(minHeap.poll()).toBe(null);
    expect(minHeap.size()).toBe(0);
  });
});

describe('Custom compare func with non number types', () => {
  test('should use custom provided compare function with non-numeric elements', () => {
    const maxHeap = new Heap({ compareFn: (a, b) => a[1] > b[1] });
    maxHeap.push([5, 2]);
    maxHeap.push([3, 1]);
    maxHeap.push([8, 4]);

    expect(maxHeap.size()).toBe(3);
    expect(maxHeap.peek()).toEqual([8, 4]);
    expect(maxHeap.getStorage()).toEqual([
      [8, 4],
      [3, 1],
      [5, 2],
    ]);

    maxHeap.push([10, 0]);
    expect(maxHeap.getStorage()).toEqual([
      [8, 4],
      [3, 1],
      [5, 2],
      [10, 0],
    ]);

    maxHeap.push([11, 11]);
    expect(maxHeap.getStorage()).toEqual([
      [11, 11],
      [8, 4],
      [5, 2],
      [10, 0],
      [3, 1],
    ]);
  });
});
