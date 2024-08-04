import { Colors, Shade } from "../Colors/Colors";
import { Shape } from "../Shape/Shape";

export type Theme = {
    isLight: boolean;

    shape: Shape;

    app: {
        background: string;
        text: string;
    };
    component: {
        border: string;

        // be overrided by app if not provided
        background?: string;
        text?: string;
    };
    system: string;

    semantic: {
        success: {
            [key in Shade]: string;
        };
        warning: {
            [key in Shade]: string;
        };
        error: {
            [key in Shade]: string;
        };
        info: {
            [key in Shade]: string;
        };
    };
};

const defaultLightTheme: Theme = {
    isLight: true,
    shape: "rounded",
    app: {
        background: "#FFFFFF",
        text: Colors.gray[900],
    },
    component: {
        border: Colors.gray[300],
        background: Colors.gray[50],
    },
    system: "#1143EF",
    semantic: {
        success: Colors.green,
        warning: Colors.orange,
        error: Colors.red,
        info: Colors.blue,
    },
};
const defaultDarkTheme: Theme = {
    isLight: false,
    shape: "rounded",
    app: {
        background: "#101112",
        text: Colors.gray[50],
    },
    component: {
        background: "#101112",
        border: Colors.gray[700],
    },
    system: "#5777E7",
    semantic: {
        success: Colors.green,
        warning: Colors.orange,
        error: Colors.red,
        info: Colors.blue,
    },
};
export { defaultLightTheme, defaultDarkTheme };
