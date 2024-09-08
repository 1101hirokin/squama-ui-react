"use client";
import "./SquamaApp.css";
import { SquamaComponentProps, Theme, squamaComponentClass } from "../../api";
import { buildClassName, Modify } from "../../utils";
import styles from "./SquamaApp.module.css";
import { SquamaContextProvider } from "../SquamaContext/SquamaContext";
import { FloatingContentContextProvider } from "../../api/FloatingContent/FloatingContent";
import { forwardRef } from "react";

type SquamaAppProps = Modify<
    SquamaComponentProps,
    {
        themes?: { [key: string]: Theme };
        initialThemeKey?: string;
    }
>;

export const SquamaApp = forwardRef<HTMLDivElement, SquamaAppProps>(
    (props, ref) => {
        const { themes, initialThemeKey, children, ...rest } = props;

        return (
            <SquamaContextProvider
                themes={themes}
                initialThemeKey={initialThemeKey}
            >
                <div
                    ref={ref}
                    {...rest}
                    className={buildClassName(
                        styles.SquamaApp,
                        rest.className,
                        squamaComponentClass,
                    )}
                >
                    <FloatingContentContextProvider>
                        {children}
                    </FloatingContentContextProvider>
                </div>
            </SquamaContextProvider>
        );
    },
);
