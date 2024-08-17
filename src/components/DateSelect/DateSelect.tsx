import React from "react";
import {
    ComponentSize,
    getPixelFromComponentSize,
    squamaComponentClass,
    SquamaComponentProps,
} from "../../api";
import { buildClassName, Modify } from "../../utils";

import styles from "./DateSelect.module.css";
import { Text } from "../Text/Text";
import { Button } from "../Button/Button";

type DateSelectProps = Modify<
    SquamaComponentProps,
    {
        size?: ComponentSize;
    }
>;

export const DateSelect = (p: DateSelectProps) => {
    const { size = "m", ...rest } = p;
    return (
        <div
            {...rest}
            className={buildClassName(squamaComponentClass, styles.DateSelect)}
        >
            <div className={styles.MonthContainer}>
                {[...Array(35)].map((_, i) => (
                    <DateSelectItem
                        key={i}
                        date={i}
                        size={size}
                        onClick={() => {}}
                    />
                ))}
            </div>
        </div>
    );
};

type DateSelectItemProps = Modify<
    SquamaComponentProps,
    {
        date: number;
        size?: ComponentSize;
        onClick: React.MouseEventHandler;
    }
>;

export const DateSelectItem = (p: DateSelectItemProps) => {
    const { date, size = "m", onClick, ...rest } = p;

    const height = getPixelFromComponentSize(size);

    const cssVars = {
        "--s-date-select-item--height": height,
    } as React.CSSProperties;

    return (
        <div
            {...rest}
            className={buildClassName(
                squamaComponentClass,
                styles.DateSelectItem,
            )}
            style={{
                ...cssVars,
                ...rest.style,
            }}
        >
            <Button
                variant="text"
                onClick={onClick}
                className={styles.itemButton}
            >
                {date}
            </Button>
        </div>
    );
};
