import { SplitPipe } from './split.pipe';

describe('SplitPipe', () => {
    const pipe = new SplitPipe();
    it('splits the values', () => {
        expect(pipe.transform('1\n2\n3', '\n')).toBe(['1', '2', '3']);
    });
});
