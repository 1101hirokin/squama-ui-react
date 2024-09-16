"use client";
import React, { useEffect } from "react";
import { Elevation, Theme, useFloatingContentContext } from "../../api";
import {
    ContextMenuElement,
    ContextMenuItemProps,
} from "../ContextMenuElement/ContextMenuElement";

type ContextMenuProps = {
    theme?: Theme;
    elevation?: Elevation;
    renderNode: (props: {
        onContextMenu: (e: React.MouseEvent<HTMLElement>) => void;
    }) => React.ReactNode;
    onContextMenu?: (e: React.MouseEvent<HTMLElement>) => void;
    onClose?: () => void;

    contextMenu?: React.ReactNode;
    menuItems: ContextMenuItemProps[];
};

export const ContextMenu = (p: ContextMenuProps) => {
    const {
        theme,
        elevation,
        onClose,
        onContextMenu,
        renderNode,
        menuItems,
        contextMenu,
    } = p;

    const floatingContentContext = useFloatingContentContext();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const contextMenuNode = contextMenu ? (
        contextMenu
    ) : (
        <ContextMenuElement
            menuItems={menuItems}
            theme={theme}
            elevation={elevation}
        />
    );

    const open = (e: React.MouseEvent<HTMLElement>) => {
        floatingContentContext.open({
            originPosition: { x: e.clientX, y: e.clientY },
            content: (() => {
                return contextMenuNode;
            })(),
            positioningFn: (window, originPosition, contentBoundingRect) => {
                const x = (() => {
                    // if cursor is too close to the right edge of the screen
                    if (
                        originPosition.x +
                            contentBoundingRect.width +
                            window.scrollX >
                        window.innerWidth
                    ) {
                        return (
                            originPosition.x -
                            contentBoundingRect.width +
                            window.scrollX
                        );
                    } else {
                        return originPosition.x;
                    }
                })();

                const y = (() => {
                    // if cursor is too close to the bottom edge of the screen
                    if (
                        originPosition.y + contentBoundingRect.height >
                        window.innerHeight
                    ) {
                        return (
                            originPosition.y +
                            window.scrollY -
                            contentBoundingRect.height
                        );
                    } else {
                        return originPosition.y + window.scrollY;
                    }
                })();

                return { x, y };
            },
            overlay: (
                <button
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        background: "transparent",
                        width: "100vw",
                        height: "100vh",
                        outline: "none",
                        border: "none",
                    }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        close();
                    }}
                    onClick={close}
                />
            ),
        });
        setIsMenuOpen(true);
    };

    const close = () => {
        floatingContentContext.close();
        setIsMenuOpen(false);
        onClose?.();
    };

    const children = renderNode({
        onContextMenu: (e) => {
            e.preventDefault();
            close();
            setTimeout(() => {
                onContextMenu?.(e);
                open(e);
            }, 50);
        },
    });

    useEffect(() => {
        const escListener = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        };

        const closeMenu = () => {
            if (isMenuOpen) {
                close();
            }
        };

        window.addEventListener("scroll", closeMenu);
        window.addEventListener("keydown", escListener);

        return () => {
            window.removeEventListener("scroll", closeMenu);
            window.removeEventListener("keydown", escListener);
        };
    }, [close, isMenuOpen]);

    return children;
};
