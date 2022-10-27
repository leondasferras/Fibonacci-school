import { lutimes } from "fs";

export class QNode<T> {
  value: T;
  next: QNode<T> | null = null;

  constructor(value: T, next?: QNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (el: T) => void;
  append: (el: T) => void;
  addByIndex: (el: T, i: number) => void;
  deleteByIndex: (i: number) => void;
  deleteHead: () => void;
  getByIndex: (index: number) => T | null;
  getLength: ()=> number;

}

export class LinkedList<T> implements ILinkedList<T> {
  private head: QNode<T> | null;
  private length: number;

  constructor(initialState?: T[]) {
    this.length = 0;
    this.head = null;
    initialState?.forEach((el) => {
      this.addByIndex(el, 0);
    });
  }



  append = (value: T) => {
    const node = new QNode<T>(value);
    if (this.length === 0) {
      this.head = node;
    } else {
      let current = this.head;
      while (current && current.next) {
        current = current.next;
      }
      if (current) {
        current.next = node;
      }
    }
    this.length++;
  };

  prepend = (value: T) => {
    const node = new QNode<T>(value);
    node.next = this.head;
    this.head = node;
    this.length++;
  };

  addByIndex = (value: T, i: number) => {
    if (i === 0) {
      this.prepend(value);
    } else {
      let node = new QNode<T>(value);
      let current = this.head;
      let counter = 0;
      let prev = null;
      while (counter < i && current) {
        prev = current;
        current = current!.next;
        counter++;
      }
      if (prev) {
        prev.next = node;
      }
      node.next = current;
      this.length++;
    }

  };

  deleteHead = () => {
    let current = this.head;
    this.head = current!.next;
    this.length--;
  };

  deleteByIndex = (i: number) => {
    let current = this.head;
    if (i === 0) {
      this.deleteHead();
    } else {
      let prev = null;
      let counter = 0;
      while(counter < i && current) {
        prev = current;
        current = current.next;
        i++
      }
      if(prev && current) {
        prev.next = current.next
      }
    }
    this.length--;
    return current ? current.value : null 
  };

  getByIndex(index: number) {
    if (index < 0 || index > this.length) {
      return null;
    }
    let currentEl = this.head;
    let curruntIndex = 0;

    while (curruntIndex < index && currentEl) {
      currentEl = currentEl.next;
      curruntIndex++;
    }
    return currentEl ? currentEl.value : null;
  }

  getLength() {
    return this.length
  }

}
