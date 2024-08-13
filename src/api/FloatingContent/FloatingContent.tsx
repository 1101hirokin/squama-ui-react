import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./FloatingContent.module.css";
import { buildClassName } from "../../utils";
import { squamaComponentClass } from "../Component/Component";

type FloatingContentOpeningProps = {
    originPosition: { x: number; y: number };
    positioningFn?: (
        window: Window,
        originPosition: {
            x: number;
            y: number;
        },
        contentBoundingRect: ClientRect,
    ) => { x: number; y: number };

    content: React.ReactNode | ((close: () => void) => React.ReactNode);
    overlay?: React.ReactNode | ((close: () => void) => React.ReactNode);
    preventScroll?: boolean;
};

type FloatingContentContextProps = {
    open: (props: FloatingContentOpeningProps) => void;
    close: () => void;
};
const notInitializedError = new Error(
    "FloatingContentContextProvider not initialized",
);
const defaultContext: FloatingContentContextProps = {
    open: () => {
        throw notInitializedError;
    },
    close: () => {
        throw notInitializedError;
    },
};

const FloatingContent = (p: {
    props: FloatingContentOpeningProps;
    closeFn: () => void;
}): React.ReactNode => {
    const { props, closeFn } = p;

    const [opacity, setOpacity] = useState(0);

    const contentRef = useRef<HTMLDivElement>(null);
    const [contentPosition, setContentPosition] = useState({
        x: 0,
        y: 0,
    });

    const innerContent =
        typeof props.content === "function"
            ? props.content(closeFn)
            : props.content;

    const cssVars = {
        "--x": `${contentPosition.x}px`,
        "--y": `${contentPosition.y}px`,
        "--opacity": opacity,
    } as React.CSSProperties;

    useEffect(() => {
        if (contentRef.current) {
            const boundingRect = contentRef.current.getBoundingClientRect();

            const positioningFn =
                props.positioningFn ||
                ((_, originPosition, __) => {
                    return originPosition;
                });

            setContentPosition(
                positioningFn(window, props.originPosition, boundingRect),
            );
            setOpacity(1);
        }
    }, [contentRef.current, props]);

    return (
        <div
            className={buildClassName(styles.FloatingContent)}
            style={cssVars}
            ref={contentRef}
        >
            {innerContent}
        </div>
    );
};

const FloatingContentContext =
    createContext<FloatingContentContextProps>(defaultContext);

export const FloatingContentContextProvider = (props: {
    children: React.ReactNode;
}) => {
    const { children } = props;

    const [content, setContent] = useState<React.ReactNode | null>(null);
    const [overlay, setOverlayCloser] = useState<React.ReactNode | null>(null);

    const [isScrollPrevented, setIsScrollPrevented] = useState(false);

    const close = () => {
        setContent(null);
        setOverlayCloser(null);

        if (document.body.style.overflow === "hidden") {
            document.body.style.overflow = "";
            setIsScrollPrevented(false);
        }
    };

    const open = (props: FloatingContentOpeningProps) => {
        const floatingContent = (
            <FloatingContent props={props} closeFn={close} />
        ) as React.ReactNode;

        setContent(floatingContent);
        if (props.overlay) {
            const overlay =
                typeof props.overlay === "function"
                    ? props.overlay(close)
                    : props.overlay;
            setOverlayCloser(overlay);
        }

        if (props.preventScroll) {
            document.body.style.overflow = "hidden";
        }
    };

    return (
        <FloatingContentContext.Provider
            value={{
                open: open,
                close: close,
            }}
        >
            <div
                className={buildClassName(
                    styles.FloatingContentContext,
                    squamaComponentClass,
                    isScrollPrevented ? styles.isScrollPrevented : null,
                )}
            >
                <div className={styles.mainContainer}>{children}</div>
                {overlay ? (
                    <div className={styles.overlayContainer}>{overlay}</div>
                ) : null}
                <div className={styles.floatingContentContainer}>{content}</div>
            </div>
        </FloatingContentContext.Provider>
    );
};

export const useFloatingContentContext = () =>
    useContext(FloatingContentContext);
