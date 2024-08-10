import {
    SquamaComponentProps,
    squamaComponentClass,
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
        custom?: {
            level?: number;
            type?:
                | "heading"
                | "subtitle"
                | "body"
                | "button"
                | "caption"
                | "overline";
        };
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
            classNames.push(styles.l1, styles.heading);
            break;
        case "heading.2":
            classNames.push(styles.l2, styles.heading);
            break;
        case "heading.3":
            classNames.push(styles.l3, styles.heading);
            break;
        case "heading.4":
            classNames.push(styles.l4, styles.heading);
            break;
        case "heading.5":
            classNames.push(styles.l5, styles.heading);
            break;
        case "heading.6":
            classNames.push(styles.l6, styles.heading);
            break;
        case "subtitle.1":
            classNames.push(styles.l3, styles.subtitle);
            break;
        case "subtitle.2":
            classNames.push(styles.l4, styles.subtitle);
            break;
        case "body.1":
            classNames.push(styles.l4, styles.body);
            break;
        case "body.2":
            classNames.push(styles.l5, styles.body);
            break;
        case "button":
            classNames.push(styles.l4, styles.button);
            break;
        case "caption":
            classNames.push(styles.l4, styles.caption);
            break;
        case "overline":
            classNames.push(styles.l5, styles.overline);
            break;
        default:
            break;
    }
    return classNames;
};

export const Text = (props: TextProps) => {
    const { typeScale = "body.1", element, custom, ...rest } = props;

    const Element =
        element ||
        (convertTypeScaleToElement(typeScale) as React.ElementType<TextProps>);

    const classNames = custom
        ? (() => {
              const classNames: string[] = [];
              switch (custom.type) {
                  case "heading":
                      classNames.push(styles.heading);
                      break;
                  case "subtitle":
                      classNames.push(styles.subtitle);
                      break;
                  case "body":
                      classNames.push(styles.body);
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

              switch (custom.level) {
                  case 1:
                      classNames.push(styles.l1);
                      break;
                  case 2:
                      classNames.push(styles.l2);
                      break;
                  case 3:
                      classNames.push(styles.l3);
                      break;
                  case 4:
                      classNames.push(styles.l4);
                      break;
                  case 5:
                      classNames.push(styles.l5);
                      break;
                  case 6:
                      classNames.push(styles.l6);
                      break;
                  default:
                      break;
              }

              return classNames;
          })()
        : getTextClassNamesByTypeScale(typeScale);

    return (
        <Element
            {...rest}
            className={buildClassName(
                squamaComponentClass,
                classNames,
                rest.className,
                styles.Text,
            )}
            style={{
                ...rest.style,
            }}
        />
    );
};
