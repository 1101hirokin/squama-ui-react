import { Color } from "../Color/Color";
import { Colors } from "../Colors/Colors";

export type Variant = "filled" | "outlined" | "text" | "disabled";

type ComponentColor = {
    background: string;
    border: string;
    text: string;
};

export const getComponentColor = (
    color: string,
    variant: Variant = "filled",
): {
    normal: ComponentColor;
    hover: ComponentColor;
    active: ComponentColor;
    disabled: ComponentColor;
} => {
    const parsedColor = Color.fromCSSString(color);
    const isColorLight = parsedColor.luminance > 0.5;

    switch (variant) {
        case "outlined":
            return {
                normal: {
                    background: `transparent`,
                    border: `1px solid ${color}`,
                    text: color,
                },
                hover: {
                    background: parsedColor.getAlphaColor(0.08).cssString,
                    border: `1px solid ${color}`,
                    text: color,
                },
                active: {
                    background: parsedColor.getAlphaColor(0.16).cssString,
                    border: `1px solid ${color}`,
                    text: color,
                },
                disabled: {
                    background: `transparent`,
                    border: `1px solid ${isColorLight ? Colors.gray[200] : Colors.gray[400]}`,
                    text: isColorLight ? Colors.gray[400] : Colors.gray[200],
                },
            };
        case "text":
            return {
                normal: {
                    background: `transparent`,
                    border: `transparent`,
                    text: color,
                },
                hover: {
                    background: parsedColor.getAlphaColor(0.08).cssString,
                    border: `transparent`,
                    text: color,
                },
                active: {
                    background: parsedColor.getAlphaColor(0.16).cssString,
                    border: `transparent`,
                    text: color,
                },
                disabled: {
                    background: `transparent`,
                    border: `transparent`,
                    text: isColorLight ? Colors.gray[400] : Colors.gray[200],
                },
            };
        default:
            return {
                normal: {
                    background: color,
                    border: `none`,
                    text: isColorLight ? Colors.gray[900] : Colors.gray[50],
                },
                hover: {
                    background: parsedColor.getMixedColor("white", 0.04)
                        .cssString,
                    border: `none`,
                    text: isColorLight ? Colors.gray[900] : Colors.gray[50],
                },
                active: {
                    background: parsedColor.getMixedColor("white", 0.12)
                        .cssString,
                    border: `none`,
                    text: isColorLight ? Colors.gray[900] : Colors.gray[50],
                },
                disabled: {
                    background: isColorLight
                        ? Colors.gray[200]
                        : Colors.gray[400],
                    border: `none`,
                    text: isColorLight ? Colors.gray[400] : Colors.gray[200],
                },
            };
    }
};
