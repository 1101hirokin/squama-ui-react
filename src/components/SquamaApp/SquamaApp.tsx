import "./SquamaApp.css";
import { SquamaComponentProps, squamaComponentStyles } from "../../api";
import { buildClassName, Modify } from "../../utils";
import styles from "./SquamaApp.module.css";
import { SquamaContextProvider } from "../SquamaContext/SquamaContext";

type SquamaAppProps = Modify<SquamaComponentProps, {}>;

export const SquamaApp = (props: SquamaAppProps) => {
    const { id, className, style, children } = props;

    return (
        <SquamaContextProvider>
            <div
                id={id}
                className={buildClassName(
                    styles.SquamaApp,
                    className,
                    squamaComponentStyles,
                )}
                style={style}
            >
                {children}
            </div>
        </SquamaContextProvider>
    );
};
