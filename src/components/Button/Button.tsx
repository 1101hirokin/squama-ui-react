import React, { useMemo } from "react";
import {
    Elevation,
    getBorderRadiusByShape,
    getBoxShadowByElevation,
    getComponentColor,
    Shape,
    squamaComponentClass,
    SquamaComponentProps,
    Variant,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import styles from "./Button.module.css";
import { Text } from "../Text/Text";
import { CircularLoader } from "../CircularLoader/CircularLoader";

type ButtonProps = Modify<
    SquamaComponentProps,
    {
        elevation?: Elevation;
        variant?: Extract<Variant, "filled" | "outlined" | "text">;
        shape?: Shape;
        size?: "s" | "m" | "l";

        color?: string;

        disabled?: boolean;

        block?: boolean;
        loading?: boolean | "loading" | "paused" | "none";

        onClick?: React.ComponentProps<"button">["onClick"];
        onClickInLoading?: React.ComponentProps<"button">["onClick"];
    }
>;

export const Button = (props: ButtonProps) => {
    const {
        elevation = 0,
        variant = "filled",
        shape = "rounded",
        color = "#000",
        size = "m",
        children,
        disabled,
        block,
        loading = false,
        onClickInLoading,
        onClick,
        ...rest
    } = props;

    const cssVars = useMemo<React.CSSProperties>(() => {
        const boxShadow = disabled
            ? "none"
            : getBoxShadowByElevation(elevation);
        const borderRadius = getBorderRadiusByShape(shape);
        const componentStyle = getComponentColor(color, variant);

        return {
            "--s-button--box-shadow": boxShadow,
            "--s-button--border-radius": borderRadius,

            // Normal style
            "--s-button--background-color--normal":
                componentStyle.normal.background,
            "--s-button--border--normal": componentStyle.normal.border,
            "--s-button--color--normal": componentStyle.normal.text,

            // hover style (and focused style)
            "--s-button--background-color--hover":
                componentStyle.hover.background,
            "--s-button--border--hover": componentStyle.hover.border,
            "--s-button--color--hover": componentStyle.hover.text,

            // active style
            "--s-button--background-color--active":
                componentStyle.active.background,
            "--s-button--border--active": componentStyle.active.border,
            "--s-button--color--active": componentStyle.active.text,

            // disabled style
            "--s-button--background-color--disabled":
                componentStyle.disabled.background,
            "--s-button--border--disabled": componentStyle.disabled.border,
            "--s-button--color--disabled": componentStyle.disabled.text,
        } as React.CSSProperties;
    }, [color, variant, shape, elevation, disabled]);

    const isLoading =
        loading === true || loading === "loading" || loading === "paused";

    return (
        <button
            {...rest}
            disabled={disabled}
            style={{
                ...cssVars,
                ...rest.style,
            }}
            className={buildClassName(
                styles.Button,
                rest.className,
                block ? styles.block : undefined,
                isLoading ? styles.isLoading : undefined,
                size === "s"
                    ? styles.small
                    : size === "l"
                      ? styles.large
                      : undefined,
                squamaComponentClass,
            )}
            onClick={(e) => {
                isLoading ? onClickInLoading?.(e) : onClick?.(e);
            }}
        >
            <div className={styles.mainLayer}>
                <div className={styles.childTextContainer}>
                    <Text typeScale="button" className={styles.childText}>
                        {children}
                    </Text>
                </div>
            </div>
            <div
                className={buildClassName(
                    styles.circularLoaderContainer,
                    styles.absLayer,
                )}
            >
                <CircularLoader
                    loading={loading}
                    size="1rem"
                    className={styles.circularLoader}
                />
            </div>
        </button>
    );
};
