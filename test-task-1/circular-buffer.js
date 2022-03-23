class CircularBuffer {
  #capacity = 0;
  #start = 0;
  #end = -1;
  #size = 0;
  #queue;

  constructor(capacity) {
    this.#capacity = capacity;
    this.#queue = new Array(capacity);
  }

  write(item) {
    if (this.#isFull()) {
      throw new BufferFullError();
    };

    this.#end = (this.#end + 1) % this.#capacity;
    this.#queue[this.#end] = item;
    this.#size++;
  }

  read() {
    if (this.#isEmpty()) {
      throw new BufferEmptyError();
    };

    let tmp = this.#queue[this.#start];
    this.#start = (this.#start + 1) % this.#capacity;
    this.#size--;
    return tmp;
  }

  forceWrite(item) {
    this.#end = (this.#end + 1) % this.#capacity;
    this.#queue[this.#end] = item;
    if (!this.#isFull()) {
      this.#size++;
    }
    if (this.#end === this.#start) {
      this.#start = (this.#start + 1) % this.#capacity;
    }
  }

  clear() {
    this.#start = 0;
    this.#end = 0;
    this.#size = 0;
    this.#queue = new Array(this.#capacity);
  }

  #isFull() {
    if (this.#size === this.#capacity) {
      return true;
    }
    return false;
  }

  #isEmpty() {
    if (this.#size === 0) {
      return true;
    }
    return false;
  }

  show() {
    if (this.#isEmpty()) throw new BufferEmptyError();
    if (this.#isFull()) throw new BufferFullError();

    let output = '';
    for (let i = this.#start, j = 0; j < this.#size; i = (i + 1) % this.#capacity, j++) {
      output = output.concat(this.#queue[i] + ' ');
    }

    return output;
  }

}

export class BufferFullError extends Error {
  constructor(message = "Error: Buffer is full") {
    super(message);
    this.name = "BufferFullError";
  }
}

export class BufferEmptyError extends Error {
  constructor(message = "Error: Buffer is empty") {
    super(message);
    this.name = "BufferFullError";
  }
}

export default CircularBuffer;