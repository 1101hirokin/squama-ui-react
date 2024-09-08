"use client";
import React, { useEffect } from "react";
import {
    Elevation,
    getBorderRadiusByShape,
    getBoxShadowByElevation,
    squamaComponentClass,
    SquamaComponentProps,
    Theme,
    useFloatingContentContext,
} from "../../api";
import { buildClassName, Modify } from "../../utils";

import styles from "./ContextMenu.module.css";
import { Text } from "../Text/Text";
import { useSquamaContext } from "../SquamaContext/SquamaContext";

export type ContextMenuItemProps = {
    id?: string;
    label: React.ReactNode;

    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    subItems?: ContextMenuItemProps[];

    // props for anchor
    href?: React.ComponentProps<"a">["href"];
    target?: React.ComponentProps<"a">["target"];
    rel?: React.ComponentProps<"a">["rel"];

    // props for button
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement>,
        item: ContextMenuItemProps,
    ) => void;
    buttonType?: "button" | "submit" | "reset";
};

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

const calcChildMenuPosition = (
    menu: HTMLElement,
    hoveredItem: HTMLElement,
    yPadding = 0,
    _: boolean,
    toTop: boolean,
): {
    x: number;
    y: number;
} => {
    const x = -menu.offsetWidth;
    const y = toTop
        ? menu.offsetHeight -
          (hoveredItem.offsetTop + hoveredItem.offsetHeight) -
          yPadding
        : hoveredItem.offsetTop - yPadding;

    return { x, y };
};
const ContextMenuComponent = (
    props: Modify<
        SquamaComponentProps,
        {
            menuItems: ContextMenuProps["menuItems"];
            isChild?: boolean;

            toLeft?: boolean;
            toTop?: boolean;

            theme?: Theme;
            elevation?: Elevation;
        }
    >,
) => {
    const {
        menuItems,
        isChild = false,
        toTop,
        toLeft,
        style,
        theme,
        elevation = 20,
        ...rest
    } = props;

    const context = useSquamaContext();
    const usedTheme = theme || context.getCurrentTheme();

    const [childMenu, setChildMenu] = React.useState<React.ReactNode>(null);

    const boxShadow = getBoxShadowByElevation(elevation);
    const borderRadius = getBorderRadiusByShape("rounded");

    const menuRef = React.useRef<HTMLDivElement>(null);

    const yPadding = 8;

    const cssVars = {
        "--s-context-menu--background":
            usedTheme.component.background || usedTheme.app.background,
        "--s-context-menu--color":
            usedTheme.component.text || usedTheme.app.text,

        "--s-context-menu--box-shadow": boxShadow,
        "--s-context-menu--padding-y": `${yPadding}px`,
        "--s-context-menu--border-radius": borderRadius,

        "--s-context-menu-item--background--hover": usedTheme.isLight
            ? "rgba(0, 0, 0, 0.1)"
            : "rgba(255, 255, 255, 0.1)",
    } as React.CSSProperties;

    return (
        <div
            ref={menuRef}
            style={{
                ...style,
                ...cssVars,
            }}
            className={buildClassName(
                squamaComponentClass,
                styles.ContextMenuArea,
                isChild && styles.child,
            )}
        >
            <div
                className={buildClassName(styles.ContextMenu, rest.className)}
                onContextMenu={(e) => {
                    e.preventDefault();
                }}
            >
                {menuItems.map((item, i) => {
                    return (
                        <ContextMenuItem
                            key={item.id || i}
                            {...item}
                            onClick={(e) => {
                                e.stopPropagation();
                                item.onClick?.(e, item);
                            }}
                            onMouseEnter={(e) => {
                                e.stopPropagation();

                                setChildMenu(null);

                                // サブアイテムを持っているとき、サブメニューを生成
                                if (item.subItems && menuRef.current) {
                                    const menuBoundingRect =
                                        menuRef.current.getBoundingClientRect();

                                    // サブメニューを上方向に配置するか否か： toTopの値が上位から与えられていないとき（ルートメニューのとき）、画面上部にあるか下部にあるかで判定
                                    const currentToTop =
                                        toTop === undefined
                                            ? menuBoundingRect.top >
                                              window.innerHeight / 2
                                            : toTop;

                                    // サブメニューを左方向に配置するか否か： toLeftの値が与えられていないとき（ルートメニューのとき）、画面
                                    const currentToLeft =
                                        toLeft === undefined
                                            ? menuBoundingRect.left >
                                              window.innerWidth / 2
                                            : toLeft;

                                    const { x, y } = calcChildMenuPosition(
                                        menuRef.current,
                                        e.currentTarget,
                                        yPadding,
                                        currentToLeft,
                                        currentToTop,
                                    );

                                    const child = (
                                        <ContextMenuComponent
                                            style={{
                                                top: currentToTop
                                                    ? undefined
                                                    : y,
                                                bottom: currentToTop
                                                    ? y
                                                    : undefined,
                                                left: currentToLeft
                                                    ? x
                                                    : undefined,
                                                right: currentToLeft
                                                    ? undefined
                                                    : x,
                                            }}
                                            menuItems={item.subItems}
                                            isChild
                                            toTop={currentToTop}
                                            toLeft={currentToLeft}
                                        />
                                    );

                                    setChildMenu(child);
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    );
                })}
            </div>
            {childMenu}
        </div>
    );
};

const ContextMenuItem = (
    p: Modify<SquamaComponentProps, ContextMenuItemProps>,
) => {
    const {
        label,
        leading,
        trailing,
        subItems,

        onClick,
        buttonType,

        href,
        target,
        rel,

        ...rest
    } = p;

    const InnerElement = () => {
        return (
            <div className={styles.mainLayer}>
                <div className={styles.itemLeadingContainer}>{leading}</div>
                <div className={styles.itemContentContainer}>
                    <Text custom={{ level: 5 }} element="span">
                        {label}
                    </Text>
                </div>
                <div className={styles.itemTrailingContainer}>{trailing}</div>
            </div>
        );
    };

    const isAnchor = href !== undefined;

    const hasLeading = leading !== undefined;
    const hasTrailing = trailing !== undefined;

    if (isAnchor) {
        return (
            <li
                {...rest}
                className={buildClassName(
                    styles.ContextMenuItem,
                    hasLeading && styles.hasLeading,
                    hasTrailing && styles.hasTrailing,
                    rest.className,
                )}
            >
                <a
                    className={styles.ActionTrigger}
                    href={href}
                    target={target}
                    rel={rel}
                >
                    <InnerElement />
                </a>
            </li>
        );
    } else {
        return (
            <li
                {...rest}
                className={buildClassName(
                    styles.ContextMenuItem,
                    rest.className,
                )}
            >
                <button
                    className={styles.ActionTrigger}
                    onClick={(e) => {
                        onClick?.(e, p);
                    }}
                    type={buttonType || "button"}
                >
                    <InnerElement />
                </button>
            </li>
        );
    }
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
        <ContextMenuComponent
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
