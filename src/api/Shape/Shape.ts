export type Shape =
    | "rounded"
    | "rounded.s"
    | "rounded.m"
    | "rounded.l"
    | "circular"
    | "square";

export const getBorderRadiusByShape = (shape: Shape): string => {
    switch (shape) {
        case "rounded":
            return `${6}px`;
        case "rounded.s":
            return `${2}px`;
        case "rounded.m":
            return `${6}px`;
        case "rounded.l":
            return `${14}px`;
        case "circular":
            return "calc(1px/0)";
        case "square":
            return "0";
    }
};
