interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHead:()=> number;
  getTail:() => number;
  isEmpty:() => boolean;
  clear:() => void;

}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  clear = () => {
    this.tail = 0;
    this.head = 0;
    this.container = Array(this.size);
    this.length=0;
  }

  getTail = () => {
    return this.tail
  }

  getHead= () => {
    return this.head
  }

  isEmpty = () => this.length === 0;
}


