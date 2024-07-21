export interface Cache<T> {
    get(key: string): T | undefined;
    set(key: string, value: T): void;
    clearAll(): void;
}

export class InMemoryCache<T> implements Cache<T> {
    private _cache: { [key: string]: T } = {};

    public get(key: string): T | undefined {
        return this._cache[key];
    }

    public set(key: string, value: T): void {
        this._cache[key] = value;
    }

    public clearAll(): void {
        this._cache = {};
    }
}
