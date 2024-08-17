import styles from "./Component.module.css";

export const squamaComponentClass = styles.component;
export type SquamaComponentProps = {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;

    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onDoubleClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLElement>) => void;
    onContextMenu?: (e: React.MouseEvent<HTMLElement>) => void;
    onWheel?: (e: React.WheelEvent<HTMLElement>) => void;
};

export type ComponentSize = "s" | "m" | "l" | number;
export const getPixelFromComponentSize = (size: ComponentSize): string => {
    if (size === "s") {
        return "32px";
    }
    if (size === "m") {
        return "40px";
    }
    if (size === "l") {
        return "48px";
    }
    return `${size}px`;
};
