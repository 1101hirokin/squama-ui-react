import React, { useEffect } from "react";
import { SquamaComponentProps, useFloatingContentContext } from "../../api";
import { buildClassName, generateUUIDv4, Modify } from "../../utils";

import styles from "./ContextMenu.module.css";
import { Card } from "../Card/Card";
import { Text } from "../Text/Text";

export type ContextMenuItem = {
    label: string;

    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    subItems?: ContextMenuItem[];
};

type ContextMenuProps = Modify<
    {},
    {
        menuItems: ContextMenuItem[];
        renderNode: (props: {
            onContextMenu: (e: React.MouseEvent<HTMLElement>) => void;
        }) => React.ReactNode;
    }
>;

const calcChildMenuPosition = (
    menu: HTMLElement,
    hoveredItem: HTMLElement,
    yPadding = 0,
    toLeft: boolean,
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
        }
    >,
) => {
    const { menuItems, isChild = false, toTop, toLeft, style, ...rest } = props;

    const [childMenu, setChildMenu] = React.useState<React.ReactNode>(null);

    const menuRef = React.useRef<HTMLDivElement>(null);

    const yPadding = 8;

    const id = React.useMemo(() => {
        return generateUUIDv4();
    }, []);

    return (
        <div
            id={id}
            ref={menuRef}
            style={{
                ...style,
                ...({
                    "--s-context-menu--padding-y": `${yPadding}px`,
                } as React.CSSProperties),
            }}
            className={buildClassName(
                styles.ContextMenuArea,
                isChild && styles.child,
            )}
        >
            <Card
                style={{
                    ...{
                        backgroundColor: "#101112",
                        color: "#fff",
                    },
                }}
                elevation={20}
                shape="rounded"
                className={buildClassName(styles.ContextMenu, rest.className)}
                onContextMenu={(e) => {
                    // e.preventDefault();
                }}
            >
                {menuItems.map((item) => {
                    const uuid = React.useMemo(() => {
                        return generateUUIDv4();
                    }, []);
                    return (
                        <ContextMenuItem
                            key={item.label}
                            id={uuid}
                            label={item.label}
                            leading={item.leading}
                            trailing={item.trailing}
                            subItems={item.subItems}
                            onClick={(e) => {
                                e.stopPropagation();
                                item.onClick?.(e);
                            }}
                            onMouseEnter={(e) => {
                                e.stopPropagation();
                                setChildMenu(null);
                                if (item.subItems && menuRef.current) {
                                    const menuBoundingRect =
                                        menuRef.current.getBoundingClientRect();

                                    const currentToTop =
                                        toTop === undefined
                                            ? menuBoundingRect.top >
                                              window.innerHeight / 2
                                            : toTop;
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
            </Card>
            {childMenu}
        </div>
    );
};

export const ContextMenu = (p: ContextMenuProps) => {
    const { menuItems, renderNode } = p;

    const floatingContentContext = useFloatingContentContext();

    const open = (e: React.MouseEvent<HTMLElement>) => {
        floatingContentContext.open({
            originPosition: { x: e.clientX, y: e.clientY },
            content: (() => {
                return <ContextMenuComponent menuItems={menuItems} />;
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
                        originPosition.y +
                            contentBoundingRect.height +
                            window.scrollY >
                        window.innerHeight
                    ) {
                        return (
                            originPosition.y -
                            contentBoundingRect.height +
                            window.scrollY
                        );
                    } else {
                        return originPosition.y;
                    }
                })();

                return { x, y };
            },
        });
    };

    const close = floatingContentContext.close;

    const children = renderNode({
        onContextMenu: (e) => {
            e.preventDefault();
            close();
            setTimeout(() => {
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

        window.addEventListener("scroll", close);
        window.addEventListener("keydown", escListener);

        return () => {
            window.removeEventListener("scroll", close);
            window.removeEventListener("keydown", escListener);
        };
    }, []);

    return children;
};

type ContextMenuItemProps = Modify<SquamaComponentProps, ContextMenuItem>;

export const ContextMenuItem = (p: ContextMenuItemProps) => {
    const { onClick, label, leading, trailing, subItems, ...rest } = p;

    return (
        <div {...rest} className={styles.ContextMenuItem}>
            <div className={styles.mainLayer}>
                <div className={styles.itemLeadingContainer}>{leading}</div>
                <div className={styles.itemContentContainer}>
                    <Text custom={{ level: 5 }} element="span">
                        {label}
                    </Text>
                </div>
                <div className={styles.itemTrailingContainer}>{trailing}</div>
            </div>
        </div>
    );
};
