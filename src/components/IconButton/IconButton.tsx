import React, { useMemo } from "react";
import styles from "./IconButton.module.css";
import {
    ComponentSize,
    Elevation,
    getBorderRadiusByShape,
    getBoxShadowByElevation,
    getComponentColor,
    getPixelFromComponentSize,
    Shape,
    squamaComponentClass,
    SquamaComponentProps,
    Variant,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import { Icon, IconName } from "../Icon/Icon";
import { useSquamaContext } from "../SquamaContext/SquamaContext";
import { CircularLoader } from "../CircularLoader/CircularLoader";

type IconButtonProps = Modify<
    SquamaComponentProps,
    {
        icon: IconName;

        elevation?: Elevation;
        variant?: Variant;
        shape?: Shape;
        size?: Extract<ComponentSize, "s" | "m" | "l">;

        color?: string;

        disabled?: boolean;

        block?: boolean;
        loading?: boolean | "loading" | "paused" | "none";

        // props for anchor
        href?: React.ComponentProps<"a">["href"];
        target?: React.ComponentProps<"a">["target"];
        rel?: React.ComponentProps<"a">["rel"];

        // props for button
        onClick?: React.ComponentProps<"button">["onClick"];
        onClickInLoading?: React.ComponentProps<"button">["onClick"];
        type?: "button" | "submit" | "reset";

        children?: never;
    }
>;

export const IconButton = (props: IconButtonProps) => {
    const {
        icon,

        elevation = 0,
        variant = "filled",
        shape = "rounded",
        color = "#000",
        size = "m",

        href,
        target,
        rel,
        onClick,
        onClickInLoading,
        type = "button",

        disabled,
        block,
        loading = false,
        ...rest
    } = props;

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    if (href && onClick) {
        console.warn(
            "Button component should not have both href and onClick props.\nprops for anchor will be used and props for button will be ignored.",
        );
    }

    const cssVars = useMemo<React.CSSProperties>(() => {
        const boxShadow = disabled
            ? "none"
            : getBoxShadowByElevation(elevation);

        const borderRadius = getBorderRadiusByShape(shape ?? theme.shape);
        const componentStyle = getComponentColor(theme, color, variant);
        const _size = getPixelFromComponentSize(size);

        return {
            "--s-button--size": _size,

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
    }, [theme, color, variant]);

    const isOnLoadingProcess =
        loading === true || loading === "loading" || loading === "paused";

    const innerNode = (
        <>
            <div className={styles.mainLayer}>
                <div className={styles.iconContainer}>
                    <Icon name={icon} />
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
        </>
    );

    if (href) {
        return (
            <a
                {...rest}
                href={href}
                target={target}
                rel={rel}
                aria-disabled={disabled}
                style={{
                    ...rest.style,
                    ...cssVars,
                }}
                className={buildClassName(
                    styles.IconButton,
                    rest.className,
                    block && styles.block,
                    isOnLoadingProcess && styles.isOnLoadingProcess,
                    squamaComponentClass,
                )}
            >
                {innerNode}
            </a>
        );
    } else {
        return (
            <button
                {...rest}
                type={type}
                disabled={disabled}
                style={{
                    ...rest.style,
                    ...cssVars,
                }}
                className={buildClassName(
                    styles.IconButton,
                    rest.className,
                    block && styles.block,
                    isOnLoadingProcess && styles.isOnLoadingProcess,
                    squamaComponentClass,
                )}
                onClick={isOnLoadingProcess ? onClickInLoading : onClick}
            >
                {innerNode}
            </button>
        );
    }
};
