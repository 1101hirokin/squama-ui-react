import clsx from "clsx";
import { getBorderRadiusByShape, Shape, SquamaComponentProps } from "../../api";
import { Modify } from "../../utils";
import styles from "./SkeletonLoader.module.css";
import React from "react";
import { useSquamaContext } from "../SquamaContext/SquamaContext";

type SkeletonLoaderProps = Modify<
    SquamaComponentProps,
    {
        type?: "text" | "rect";
        shape?: Shape;

        // only for type="text"
        textLines?: number;
        lineHeight?: number;
        lastLineWidth?: React.CSSProperties["width"];

        duration?: number; // in seconds
        delay?: number; // in seconds

        dark?: boolean;
    }
>;

const Loader = (props: {
    type: SkeletonLoaderProps["type"];
    loaderClassName?: string;

    // only for type="text"
    textLines?: number;
}) => {
    const { type, loaderClassName, textLines } = props;

    const _textLines = textLines && textLines > 0 ? textLines : 1;

    switch (type) {
        case "text":
            const lines = Array.from({ length: _textLines }).map((_, i) => (
                <div
                    key={i}
                    className={clsx(styles.lineLoader, loaderClassName)}
                />
            ));
            return <div className={styles.lineLoadersContainer}>{lines}</div>;
        case "rect":
            return <div className={clsx(styles.rectLoader, loaderClassName)} />;
    }
};

const getLoaderColorSet = (
    dark: boolean,
): {
    lighter: string;
    base: string;
} => {
    return {
        lighter: dark ? "#ffffff25" : "#00000025",
        base: dark ? "#ffffff0f" : "#0000000f",
    };
};

export const SkeletonLoader = (props: SkeletonLoaderProps) => {
    const {
        type = "rect",
        shape = "square",
        textLines,
        lineHeight = 1,
        lastLineWidth = "100%",
        duration = 1.44,
        delay = 0,
        dark,
        ...rest
    } = props;

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const _dark = typeof dark === "boolean" ? dark : !theme.isLight;

    const { lighter, base } = getLoaderColorSet(_dark);

    const borderRadius = getBorderRadiusByShape(shape);

    const cssVars = {
        "--s-skeleton-loader--border-radius": borderRadius,

        "--s-skeleton-loader--line-height":
            lineHeight && lineHeight > 0 ? `${lineHeight}em` : "1em",
        "--s-skeleton-loader--last-line-width": lastLineWidth,

        "--s-skeleton-loader--duration": `${duration}s`,
        "--s-skeleton-loader--delay": `${delay}s`,

        "--s-skeleton-loader--color--lighter": lighter,
        "--s-skeleton-loader--color--base": base,
    } as React.CSSProperties;

    return (
        <div
            {...rest}
            className={styles.SkeletonLoader}
            style={{
                ...cssVars,
                ...rest.style,
            }}
        >
            <Loader
                type={type}
                loaderClassName={styles.loader}
                textLines={textLines}
            />
        </div>
    );
};
