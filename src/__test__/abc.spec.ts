export function helloWorld(): string {
    return 'Hello World';
}

describe('helloWorld function', () => {
    it('should return "Hello World"', () => {
        const result = helloWorld();

        expect(result).toBe('Hello World');
    });
});
