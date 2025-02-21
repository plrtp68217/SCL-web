export function isIterable<T>(obj: T): boolean {
    return Array.isArray(obj) || typeof obj === 'string';
}