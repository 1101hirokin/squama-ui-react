export type Shape =
    | "rounded"
    | "rounded.s"
    | "rounded.m"
    | "rounded.l"
    | "circular"
    | "square";

export const getBorderRadiusByShape = (shape: Shape): string => {
    const base = 6;
    const tolerance = 8;

    switch (shape) {
        case "rounded":
            return `${base}px`;
        case "rounded.s":
            return `${base - tolerance}px`;
        case "rounded.m":
            return `${base}px`;
        case "rounded.l":
            return `${base + tolerance}px`;
        case "circular":
            return "calc(1px/0)";
        case "square":
            return "0";
    }
};
