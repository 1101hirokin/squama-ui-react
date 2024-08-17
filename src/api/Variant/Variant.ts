import { Color } from "../Color/Color";
import { Colors } from "../Colors/Colors";
import { Theme } from "../Theme/Theme";

export type Variant = "filled" | "outlined" | "text";

type ComponentColor = {
    background: string;
    border: string;
    text: string;
};

export const getComponentColor = (
    theme: Theme,
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
                    border: `1px solid ${theme.isLight ? Colors.gray[300] : Colors.gray[400]}`,
                    text: theme.isLight ? Colors.gray[300] : Colors.gray[400],
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
                    text: theme.isLight ? Colors.gray[300] : Colors.gray[400],
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
                    background: isColorLight
                        ? parsedColor.getMixedColor("black", 0.12).cssString
                        : parsedColor.getMixedColor("white", 0.04).cssString,
                    border: `none`,
                    text: isColorLight ? Colors.gray[900] : Colors.gray[50],
                },
                active: {
                    background: isColorLight
                        ? parsedColor.getMixedColor("black", 0.24).cssString
                        : parsedColor.getMixedColor("white", 0.12).cssString,
                    border: `none`,
                    text: isColorLight ? Colors.gray[900] : Colors.gray[50],
                },
                disabled: {
                    background: theme.isLight
                        ? Colors.gray[100]
                        : Colors.gray[500],
                    border: `none`,
                    text: theme.isLight ? Colors.gray[300] : Colors.gray[300],
                },
            };
    }
};
