"use client";
import { createContext, forwardRef, useContext } from "react";
import {
    ComponentSize,
    Shape,
    squamaComponentClass,
    SquamaComponentProps,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import { useSquamaContext } from "../SquamaContext/SquamaContext";
import styles from "./AvatarGroup.module.css";

type AvatarGroupContextType = {
    size?: ComponentSize;
    shape?: Shape;
};
const defaultAvatarGroupContext: AvatarGroupContextType = {
    size: undefined,
    shape: undefined,
};

const AvatarGroupContext = createContext<AvatarGroupContextType>(
    defaultAvatarGroupContext,
);

export const _useAvatarGroupContext = () => useContext(AvatarGroupContext);

type AvatarGroupProps = Modify<
    SquamaComponentProps,
    {
        size?: ComponentSize;
        shape?: Shape;
    }
>;
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    (props, ref) => {
        const { children, size, shape, ...rest } = props;

        const context = useSquamaContext();
        const theme = context.getCurrentTheme();

        const cssVars = {
            "--s-avatar-group--gap-color": theme.app.background,
        } as React.CSSProperties;

        return (
            <AvatarGroupContext.Provider
                value={{
                    size: size,
                    shape: shape,
                }}
            >
                <div
                    ref={ref}
                    {...rest}
                    className={buildClassName(
                        styles.AvatarGroup,
                        rest.className,
                        squamaComponentClass,
                    )}
                    style={{
                        ...rest.style,
                        ...cssVars,
                    }}
                >
                    <div className={styles.avatarsContainer}>{children}</div>
                </div>
            </AvatarGroupContext.Provider>
        );
    },
);
