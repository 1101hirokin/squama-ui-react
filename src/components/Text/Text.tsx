import {
    getTextLevelByTypeScale,
    getTypographyFontSizeByLevel,
    SquamaComponentProps,
    TypeScale,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import styles from "./Text.module.css";

type TextProps = Modify<
    SquamaComponentProps,
    {
        typeScale?: TypeScale;
        element?:
            | "p"
            | "span"
            | "div"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6";
    }
>;

const convertTypeScaleToElement = (typeScale: TypeScale): string => {
    switch (typeScale) {
        case "heading.1":
            return "h1";
        case "heading.2":
            return "h2";
        case "heading.3":
            return "h3";
        case "heading.4":
            return "h4";
        case "heading.5":
            return "h5";
        case "heading.6":
            return "h6";
        default:
            return "p";
    }
};

const getTextClassNamesByTypeScale = (typeScale: TypeScale): string[] => {
    const classNames: string[] = [styles.Text];

    switch (typeScale) {
        case "heading.1":
            classNames.push(styles.h_1, styles.heading);
            break;
        case "heading.2":
            classNames.push(styles.h_2, styles.heading);
            break;
        case "heading.3":
            classNames.push(styles.h_3, styles.heading);
            break;
        case "heading.4":
            classNames.push(styles.h_4, styles.heading);
            break;
        case "heading.5":
            classNames.push(styles.h_5, styles.heading);
            break;
        case "heading.6":
            classNames.push(styles.h_6, styles.heading);
            break;
        case "subtitle.1":
            classNames.push(styles.subtitle_1, styles.subtitle);
            break;
        case "subtitle.2":
            classNames.push(styles.subtitle_2, styles.subtitle);
            break;
        case "body.1":
            classNames.push(styles.body_1, styles.body);
            break;
        case "body.2":
            classNames.push(styles.body_2, styles.body);
            break;
        case "button":
            classNames.push(styles.button);
            break;
        case "caption":
            classNames.push(styles.caption);
            break;
        case "overline":
            classNames.push(styles.overline);
            break;
        default:
            break;
    }
    return classNames;
};

export const Text = (props: TextProps) => {
    const { typeScale = "body.1", element, ...rest } = props;

    const Element =
        element ||
        (convertTypeScaleToElement(typeScale) as React.ElementType<TextProps>);

    const classNames = getTextClassNamesByTypeScale(typeScale);

    const level = getTextLevelByTypeScale(typeScale);
    const fontSize = getTypographyFontSizeByLevel(level);

    const cssVars = {
        "--s-text--font-size": `${fontSize}rem`,
    } as React.CSSProperties;

    return (
        <Element
            {...rest}
            className={buildClassName(classNames, rest.className, styles.Text)}
            style={{
                ...cssVars,
                ...rest.style,
            }}
        />
    );
};
