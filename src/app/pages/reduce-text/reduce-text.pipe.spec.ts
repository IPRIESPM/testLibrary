import { ReduceTextPipe } from "./reduce-text.pipe"

describe('ReduceTextPipe', () => {

    let pipe: ReduceTextPipe;

    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it('shouldCreate', () => {
        expect(pipe).toBeTruthy();
    });

    it('use transform correctly', () => {
      const text = 'Hello World, this is a test';
      const result = pipe.transform(text, 5);
      expect(result).toBe('Hello');
    });
 })
