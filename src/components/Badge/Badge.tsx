"use client";
import { forwardRef } from "react";
import {
    Color,
    Colors,
    ComponentSize,
    getBorderRadiusByShape,
    Shape,
    squamaComponentClass,
    SquamaComponentProps,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import { useSquamaContext } from "../SquamaContext/SquamaContext";
import styles from "./Badge.module.css";

type BadgeProps = Modify<
    SquamaComponentProps,
    {
        children?: string;
        shape?: Shape;

        color?: string;
        size?: ComponentSize;
    }
>;

export const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
    const { children, shape = "circular", color, size = "s", ...rest } = props;

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const borderRadius = getBorderRadiusByShape(shape);

    const parsedColor = Color.fromCSSString(
        color || (theme.isLight ? Colors.red[500] : Colors.red[900]),
    );

    const padding = (() => {
        switch (size) {
            case "s":
                return "4px";
            case "m":
                return "6px";
            case "l":
                return "8px";
        }
    })();

    const cssVars = {
        "--s-badge--background-color": parsedColor.cssString,
        "--s-badge--color":
            parsedColor.luminance < 0.5
                ? "white"
                : "var(--s-app--color--gray--900, black)",
        "--s-badge--border-radius": borderRadius,
        "--s-badge--padding": padding,
    } as React.CSSProperties;

    return (
        <div
            ref={ref}
            {...rest}
            className={buildClassName(
                squamaComponentClass,
                styles.Badge,
                rest.className,
            )}
            style={{
                ...cssVars,
                ...rest.style,
            }}
        >
            {children}
        </div>
    );
});
