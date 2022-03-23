import CircularBuffer, {
  BufferFullError,
  BufferEmptyError,
} from './circular-buffer';

describe('CircularBuffer', () => {
  test('reading empty buffer should fail', () => {
    const buffer = new CircularBuffer(1);
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('can read an item just written', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(buffer.read()).toBe('1');
  });

  test('buffer should be overflowed', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.write('2');
    buffer.write('3');
    expect(() => buffer.write('4')).toThrow(BufferFullError);
  });

  test('buffer shouldn\'nt be overflowed', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.forceWrite('2');
    buffer.write('3');
    expect(() => buffer.forceWrite('4')).not.toThrow();
  });

  test('forceWrite method works as a write method', () => {
    const buffer = new CircularBuffer(3);
    buffer.forceWrite('1');
    buffer.forceWrite('2');
    buffer.forceWrite('3');
    expect(buffer.read()).toBe('1');
  });

  test('buffer should be empty after clear execution', () => {
    const buffer = new CircularBuffer(3);
    buffer.forceWrite('1');
    buffer.forceWrite('2');
    buffer.clear();

    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('buffer should be empty after reading all data', () => {
    const buffer = new CircularBuffer(3);
    buffer.forceWrite('1');
    buffer.forceWrite('2');
    buffer.forceWrite('3');
    buffer.read();
    buffer.read();
    buffer.read();

    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('can read an old item, after forceWrite', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.forceWrite('2');
    buffer.write('3');
    buffer.forceWrite('4');
    buffer.forceWrite('5');

    expect(buffer.read()).toBe('3');
  });

  test('fully rewrite old items with new ones', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.forceWrite('2');
    buffer.write('3');
    buffer.forceWrite('4');
    buffer.forceWrite('5');
    buffer.forceWrite('6');

    expect(buffer.read()).toBe('4');
  });

  test('read, write and forceWrite in combination', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.write('2');
    buffer.write('3');
    buffer.read();
    buffer.read();
    buffer.write('4');
    buffer.write('5');
    buffer.forceWrite('6');

    expect(buffer.read()).toBe('4');
  });
});
