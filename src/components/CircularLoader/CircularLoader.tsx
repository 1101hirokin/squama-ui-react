import React, { forwardRef } from "react";
import { SquamaComponentProps, squamaComponentClass } from "../../api";
import { buildClassName, Modify } from "../../utils";
import styles from "./CircularLoader.module.css";

type CircularLoaderProps = Modify<
    SquamaComponentProps,
    {
        loading?: boolean | "loading" | "paused" | "none";
        color?: string;
        size?: React.CSSProperties["width"];
        children?: never;
    }
>;

export const CircularLoader = forwardRef<HTMLDivElement, CircularLoaderProps>(
    (props, ref) => {
        const { size, color, loading, ...rest } = props;

        const cssVars = {
            "--s-circular-loader--color": color,
            "--s-circular-loader--size": size ?? "100%",
        } as React.CSSProperties;

        const isLoading = loading === true || loading === "loading";
        const isPaused = loading === "paused";

        return (
            <div
                ref={ref}
                {...rest}
                className={buildClassName(
                    styles.CircularLoader,
                    isLoading && styles.isLoading,
                    isPaused && styles.isPaused,
                    rest.className,
                    squamaComponentClass,
                )}
                style={{
                    ...cssVars,
                    ...rest.style,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className={styles.loaderSvg}
                >
                    <path d="M8,16C3.59,16,0,12.41,0,8S3.59,0,8,0c.55,0,1,.45,1,1s-.45,1-1,1c-3.31,0-6,2.69-6,6s2.69,6,6,6c2.26,0,4.31-1.25,5.34-3.27.25-.49.86-.69,1.35-.43.49.25.69.85.43,1.35-1.38,2.68-4.11,4.35-7.12,4.35Z" />
                </svg>
            </div>
        );
    },
);
