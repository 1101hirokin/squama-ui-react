import { forwardRef } from "react";
import {
    Elevation,
    getBorderRadiusByShape,
    getBoxShadowByElevation,
    Shape,
    SquamaComponentProps,
    squamaComponentClass,
    Variant,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import { useSquamaContext } from "../SquamaContext/SquamaContext";
import styles from "./Card.module.css";

type CardProps = Modify<
    SquamaComponentProps,
    {
        shape?: Shape;
        variant?: Extract<Variant, "outlined">;
        elevation?: Elevation;
    }
>;

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { shape, variant, elevation = 0, ...rest } = props;

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const borderRadius = getBorderRadiusByShape(shape || theme.shape);
    const boxShadow = getBoxShadowByElevation(elevation);

    const style = {
        "--s-card--background":
            theme.component.background || theme.app.background,
        "--s-card--border":
            variant === "outlined"
                ? `1px solid ${theme.component.border}`
                : "none",

        "--s-card--border-radius": borderRadius,

        "--s-card--box-shadow": boxShadow,
    } as React.CSSProperties;

    return (
        <div
            {...rest}
            ref={ref}
            className={buildClassName(
                styles.Card,
                rest.className,
                squamaComponentClass,
                shape && styles[shape],
            )}
            style={{
                ...style,
                ...rest.style,
            }}
        >
            {rest.children}
        </div>
    );
});
