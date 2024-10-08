"use client";
import React from "react";
import { buildClassName, Modify } from "../../utils";
import {
    Elevation,
    getBorderRadiusByShape,
    getBoxShadowByElevation,
    Shape,
    squamaComponentClass,
    useFloatingContentContext,
} from "../../api";

import styles from "./Tooltip.module.css";
import { useSquamaContext } from "../SquamaContext/SquamaContext";

type TooltipRenderNodeProps = React.HTMLAttributes<HTMLElement>;

type TooltipProps = Modify<
    {},
    {
        shape?: Shape;
        content: string;
        renderNode: (props: TooltipRenderNodeProps) => React.ReactNode;
        position?: "top" | "bottom" | "left" | "right";
        elevation?: Elevation;
    }
>;

const getPosition = (
    position: TooltipProps["position"],
    window: Window,
    chipRect: DOMRect,
    currentTargetRect: DOMRect,
    offset: number = 8,
): {
    x: number;
    y: number;
} => {
    if (position === "top") {
        const x =
            currentTargetRect.left +
            currentTargetRect.width / 2 -
            chipRect.width / 2 +
            window.scrollX;
        const y =
            currentTargetRect.top - chipRect.height - offset + window.scrollY;

        return { x, y };
    } else if (position === "bottom") {
        const x =
            currentTargetRect.left +
            currentTargetRect.width / 2 -
            chipRect.width / 2 +
            window.scrollX;
        const y =
            currentTargetRect.top +
            currentTargetRect.height +
            offset +
            window.scrollY;

        return { x, y };
    } else if (position === "left") {
        const x =
            currentTargetRect.left - chipRect.width - offset + window.scrollX;
        const y =
            currentTargetRect.top +
            currentTargetRect.height / 2 -
            chipRect.height / 2 +
            window.scrollY;

        return { x, y };
    } else {
        const x =
            currentTargetRect.left +
            currentTargetRect.width +
            offset +
            window.scrollX;
        const y =
            currentTargetRect.top +
            currentTargetRect.height / 2 -
            chipRect.height / 2 +
            window.scrollY;

        return { x, y };
    }
};

export const Tooltip = (props: TooltipProps) => {
    const { shape, content, elevation = 2, renderNode } = props;

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const floatingContentContext = useFloatingContentContext();

    const borderRadius = getBorderRadiusByShape(shape || theme.shape);
    const boxShadow = getBoxShadowByElevation(elevation);

    const cssVars = {
        "--s--tooltip--border-radius": borderRadius,
        "--s--tooltip--box-shadow": boxShadow,
        "--s--tooltip--font-size": "var(--s-typography--font-size--6)",
    } as React.CSSProperties;

    const offset = 4;

    return renderNode({
        onMouseEnter: (e) => {
            floatingContentContext.close();

            const currentTarget = e.currentTarget as HTMLElement;

            floatingContentContext.open({
                content: (
                    <div
                        className={buildClassName(
                            squamaComponentClass,
                            styles.Tooltip,
                        )}
                        style={{
                            ...cssVars,
                        }}
                    >
                        {content}
                    </div>
                ),
                originPosition: {
                    x: 0,
                    y: 0,
                },
                positioningFn: (window, __, contentBoundingRect) => {
                    return getPosition(
                        props.position || "top",
                        window,
                        contentBoundingRect,
                        currentTarget.getBoundingClientRect(),
                        offset,
                    );
                },
                overlay: null,
                preventScroll: false,
            });
        },
        onMouseLeave: () => {
            floatingContentContext.close();
        },
    });
};
