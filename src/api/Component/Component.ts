import styles from "./Component.module.css";

export const squamaComponentStyles = styles.component;
export type SquamaComponentProps = {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
};
