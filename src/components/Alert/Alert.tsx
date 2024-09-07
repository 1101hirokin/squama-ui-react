import { forwardRef } from "react";
import {
    getBorderRadiusByShape,
    Shape,
    SquamaComponentProps,
    Colors,
    Shade,
    squamaComponentClass,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import { Icon, IconName } from "../Icon/Icon";
import { useSquamaContext } from "../SquamaContext/SquamaContext";

import styles from "./Alert.module.css";

type AlertProps = Modify<
    SquamaComponentProps,
    {
        type?: "success" | "info" | "warning" | "error" | "neutral";
        icon?: IconName;
        children?: React.ReactNode;
        shape?: Shape;
    }
>;

const getTypeClassName = (type: AlertProps["type"]) => {
    switch (type) {
        case "success":
            return styles.success;
        case "info":
            return styles.info;
        case "warning":
            return styles.warning;
        case "error":
            return styles.error;
        case "neutral":
            return styles.neutral;
        default:
            return "";
    }
};

const getIconNameByType = (type: AlertProps["type"]): IconName => {
    switch (type) {
        case "success":
            return "notice.ok";
        case "info":
            return "notice.info";
        case "warning":
            return "notice.alert";
        case "error":
            return "notice.error";
        case "neutral":
            return "notice.info";
        default:
            return "notice.info";
    }
};

const getColorLevels = (
    isThemeLight: boolean,
): {
    background: Shade;
    color: Shade;
    border: Shade;
} => {
    if (isThemeLight) {
        return {
            background: 100,
            color: 700,
            border: 200,
        };
    } else {
        return {
            background: 900,
            color: 50,
            border: 700,
        };
    }
};

const getColorByType = (type: AlertProps["type"]) => {
    switch (type) {
        case "success":
            return "green";
        case "info":
            return "blue";
        case "warning":
            return "yellow";
        case "error":
            return "red";
        case "neutral":
            return "gray";
        default:
            return "gray";
    }
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    const { type, icon, shape, children, ...rest } = props;

    const iconName = icon || getIconNameByType(type);

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const borderRadius = getBorderRadiusByShape(shape || theme.shape);

    const colorLevels = getColorLevels(theme.isLight);
    const color = getColorByType(type);

    const cssVars = {
        "--s-alert--border-radius": borderRadius,
        "--s-alert--background-color": Colors[color][colorLevels.background],
        "--s-alert--color": Colors[color][colorLevels.color],
        "--s-alert--border-color": Colors[color][colorLevels.border],
    } as React.CSSProperties;

    return (
        <div
            ref={ref}
            {...rest}
            className={buildClassName(
                squamaComponentClass,
                styles.Alert,
                rest.className,
                getTypeClassName(type),
            )}
            style={{
                ...cssVars,
                ...rest.style,
            }}
        >
            <div className={styles.iconContainer}>
                <Icon name={iconName} className={styles.icon} />
            </div>
            <div className={styles.contentContainer}>{children}</div>
        </div>
    );
});
