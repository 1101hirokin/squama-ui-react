import {
    Elevation,
    getBorderRadiusByShape,
    getBoxShadowByElevation,
    Shape,
    SquamaComponentProps,
    squamaComponentStyles,
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

export const Card = (props: CardProps) => {
    const { shape, variant = "outlined", elevation = 0, ...rest } = props;

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const borderRadius = getBorderRadiusByShape(shape || theme.shape);
    const boxShadow = getBoxShadowByElevation(elevation);

    const style = {
        "--s-card--background-color":
            theme.component.background || theme.app.background,
        "--s-card--border":
            variant === "outlined"
                ? `1px solid ${theme.component.border}`
                : "none",
        "--s-card--text-color": theme.component.text || theme.app.text,

        "--s-card--border-radius": borderRadius,

        "--s-card--box-shadow": boxShadow,
    } as React.CSSProperties;

    return (
        <div
            id={rest.id}
            className={buildClassName(
                styles.Card,
                rest.className,
                squamaComponentStyles,
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
};
