import React, { useMemo } from "react";
import {
    ComponentSize,
    Elevation,
    getBorderRadiusByShape,
    getBoxShadowByElevation,
    getPixelFromComponentSize,
    Shape,
    squamaComponentClass,
    SquamaComponentProps,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import styles from "./Avatar.module.css";
import avatarGroupStyles from "../AvatarGroup/AvatarGroup.module.css";
import { _useAvatarGroupContext } from "../AvatarGroup/AvatarGroup";

type AvatarProps = Modify<
    SquamaComponentProps,
    {
        // image avatar
        src?: string;
        alt?: string;

        // anchor props
        href?: React.ComponentProps<"a">["href"];
        target?: React.ComponentProps<"a">["target"];
        rel?: React.ComponentProps<"a">["rel"];

        // button props
        onClick?: React.ComponentProps<"button">["onClick"];
        type?: "button" | "submit" | "reset";

        elevation?: Elevation;
        shape?: Shape;
        size?: ComponentSize;
    }
>;

export const Avatar = (props: AvatarProps) => {
    const {
        children,

        src,
        alt,

        href,
        target,
        rel,

        onClick,
        type,

        elevation = 0,
        shape = "circular",
        size = "m",

        ...rest
    } = props;

    // Warn if both children and src props are provided
    if (children && src) {
        console.warn(
            "Avatar component should not have both children and src props. src will be used and children will be ignored.",
        );
    }

    // Warn if both href and onClick props are provided
    if (href && onClick) {
        console.warn(
            "Button component should not have both href and onClick props.\nprops for anchor will be used and props for button will be ignored.",
        );
    }

    const hasEffect = href || onClick;

    const avatarGroupContext = _useAvatarGroupContext();

    const cssVars = useMemo(() => {
        const _size = getPixelFromComponentSize(
            avatarGroupContext.size || size,
        );
        const borderRadius = getBorderRadiusByShape(
            avatarGroupContext.shape || shape,
        );
        const boxShadow = getBoxShadowByElevation(elevation);

        return {
            "--s-avatar--size": _size,
            "--s-avatar--border-radius": borderRadius,
            "--s-avatar--box-shadow": boxShadow,
        } as React.CSSProperties;
    }, [shape, size, elevation, avatarGroupContext]);

    const _children = (() => {
        if (src) {
            const innerNode = (
                <img src={src} alt={alt} className={styles.avatarImage} />
            );

            if (href) {
                return (
                    <a
                        href={href}
                        target={target}
                        rel={rel}
                        className={styles.avatarButton}
                    >
                        {innerNode}
                    </a>
                );
            } else {
                return (
                    <button
                        onClick={onClick}
                        type={type}
                        className={styles.avatarButton}
                    >
                        {innerNode}
                    </button>
                );
            }
        } else {
            return children;
        }
    })();

    return (
        <div
            {...rest}
            className={buildClassName(
                styles.Avatar,
                avatarGroupStyles.Avatar,
                hasEffect && styles.hasEffect,
                props.className,
                squamaComponentClass,
            )}
            style={{
                ...cssVars,
                ...props.style,
            }}
        >
            <div className={styles.childrenContainer}>{_children}</div>
        </div>
    );
};
