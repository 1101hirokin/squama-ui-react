export type TypeScale =
    | "heading.1"
    | "heading.2"
    | "heading.3"
    | "heading.4"
    | "heading.5"
    | "heading.6"
    | "subtitle.1"
    | "subtitle.2"
    | "body.1"
    | "body.2"
    | "button"
    | "caption"
    | "overline";

export const getTextLevelByTypeScale = (typeScale: TypeScale): number => {
    switch (typeScale) {
        case "heading.1":
            return 1;
        case "heading.2":
            return 2;
        case "heading.3":
            return 3;
        case "heading.4":
            return 4;
        case "heading.5":
            return 5;
        case "heading.6":
            return 6;
        case "subtitle.1":
            return 3;
        case "subtitle.2":
            return 4;
        case "body.1":
            return 4;
        case "body.2":
            return 5;
        case "button":
            return 4;
        case "caption":
            return 4;
        case "overline":
            return 5;
        default:
            return 1;
    }
};

export const getTypographyFontSizeByLevel = (
    level: number,
    digitAfterDecimalPoint: number = 2,
): number => {
    const digitFactor = Math.pow(10, digitAfterDecimalPoint);

    return Math.floor((9 / (2 * level + 1)) * digitFactor) / digitFactor;
};
