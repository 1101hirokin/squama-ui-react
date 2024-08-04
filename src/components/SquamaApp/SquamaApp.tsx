import "./SquamaApp.css";
import { SquamaComponentProps, squamaComponentClass } from "../../api";
import { buildClassName, Modify } from "../../utils";
import styles from "./SquamaApp.module.css";
import { SquamaContextProvider } from "../SquamaContext/SquamaContext";
import { FloatingContentContextProvider } from "../../api/FloatingContent/FloatingContent";

type SquamaAppProps = Modify<SquamaComponentProps, {}>;

export const SquamaApp = (props: SquamaAppProps) => {
    const { children, ...rest } = props;

    return (
        <SquamaContextProvider>
            <div
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
};
