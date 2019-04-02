export class Calculator {
    public Sum(a: number, b: number): number {
        const c = a + b;
        return c;
    }

    public Difference(a: number, b: number): number {
        const c = a - b;
        return c;
    }
}

module.exports = Calculator;
