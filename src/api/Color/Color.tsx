import chroma from "chroma-js";
import { Cache, InMemoryCache } from "../Cache/Cache";

const cache: Cache<Color> = new InMemoryCache();

export class Color {
    private _color: chroma.Color;
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    constructor(r: number, g: number, b: number, a: number = 1) {
        this._color = chroma(r, g, b, a);
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    public static fromCSSString(cssString: string): Color {
        const cached = cache.get(cssString);
        if (cached) {
            return cached;
        }

        try {
            const chromaColor = chroma(cssString).rgba();

            const color = new Color(
                chromaColor[0],
                chromaColor[1],
                chromaColor[2],
                chromaColor[3],
            );
            cache.set(cssString, color);

            return color;
        } catch (e) {
            throw new Error(`Error parsing color: ${cssString}`);
        }
    }

    public get cssString(): string {
        return this._color.css();
    }

    public get rgbValue(): [number, number, number, number] {
        return [this._r, this._g, this._b, this._a];
    }
    public get luminance(): number {
        return this._color.luminance();
    }

    public getAlphaColor(amount: number): Color {
        const alpha = this._color.alpha(amount).rgba();

        const color = new Color(alpha[0], alpha[1], alpha[2], alpha[3]);

        return color;
    }

    public getMonoColor(): Color {
        const mono = this._color.desaturate(1).rgba();

        const color = new Color(mono[0], mono[1], mono[2], mono[3]);

        return color;
    }

    public getMixedColor(target: string | Color, amount: number): Color {
        if (typeof target === "string") {
            const mixed = this._color.mix(target, amount).rgba();
            const mixedColor = new Color(
                mixed[0],
                mixed[1],
                mixed[2],
                mixed[3],
            );
            return mixedColor;
        } else {
            const mixed = this._color.mix(target._color, amount).rgba();
            const mixedColor = new Color(
                mixed[0],
                mixed[1],
                mixed[2],
                mixed[3],
            );
            return mixedColor;
        }
    }
}
