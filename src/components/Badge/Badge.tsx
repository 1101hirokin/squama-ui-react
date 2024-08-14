import {
    Color,
    Colors,
    getBorderRadiusByShape,
    Shape,
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
    }
>;

export const Badge = (p: BadgeProps) => {
    const { children, shape, color, ...rest } = p;

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const borderRadius = getBorderRadiusByShape(shape || "circular");

    const parsedColor = Color.fromCSSString(
        color || (theme.isLight ? Colors.red[500] : Colors.red[900]),
    );

    const cssVars = {
        "--s-badge--background-color": parsedColor.cssString,
        "--s-badge--color":
            parsedColor.luminance < 0.5
                ? "white"
                : "var(--s-app--color--gray--900, black)",
        "--s-badge--border-radius": borderRadius,
    } as React.CSSProperties;

    return (
        <div
            {...rest}
            className={buildClassName(styles.Badge, rest.className)}
            style={{
                ...cssVars,
                ...rest.style,
            }}
        >
            {children}
        </div>
    );
};
