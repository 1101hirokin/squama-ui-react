export type Elevation =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;

/*
(() => {
    let result = '';

    for (let i = 0; i <= 23; i++) {
        // 小数点以下3桁までの数値を取得する
        const length = 3;
        const factor = Math.pow(10, length);
        const y_core = Math.floor((2 / 23) * i * factor) / factor;
        const br_core = Math.floor((6 / 23) * i * factor) / factor;

        const y_cast = Math.floor((20 / 23) * i * factor) / factor;
        const br_cast = Math.floor((28 / 23) * i * factor) / factor;

        result += `case ${i}: 
            return "0 ${y_core}px ${br_core}px 0px rgba(0, 0, 0, 0.28), 0px ${y_cast}px ${br_cast}px 0px rgba(0, 0, 0, 0.18)"
`
    }

    console.log(result);
})();
*/
export const getBoxShadowByElevation = (elevation: Elevation): string => {
    switch (elevation) {
        case 0:
            return "0 0px 0px 0px rgba(0, 0, 0, 0.28), 0px 0px 0px 0px rgba(0, 0, 0, 0.18)";
        case 1:
            return "0 0.086px 0.26px 0px rgba(0, 0, 0, 0.28), 0px 0.869px 1.217px 0px rgba(0, 0, 0, 0.18)";
        case 2:
            return "0 0.173px 0.521px 0px rgba(0, 0, 0, 0.28), 0px 1.739px 2.434px 0px rgba(0, 0, 0, 0.18)";
        case 3:
            return "0 0.26px 0.782px 0px rgba(0, 0, 0, 0.28), 0px 2.608px 3.652px 0px rgba(0, 0, 0, 0.18)";
        case 4:
            return "0 0.347px 1.043px 0px rgba(0, 0, 0, 0.28), 0px 3.478px 4.869px 0px rgba(0, 0, 0, 0.18)";
        case 5:
            return "0 0.434px 1.304px 0px rgba(0, 0, 0, 0.28), 0px 4.347px 6.086px 0px rgba(0, 0, 0, 0.18)";
        case 6:
            return "0 0.521px 1.565px 0px rgba(0, 0, 0, 0.28), 0px 5.217px 7.304px 0px rgba(0, 0, 0, 0.18)";
        case 7:
            return "0 0.608px 1.826px 0px rgba(0, 0, 0, 0.28), 0px 6.086px 8.521px 0px rgba(0, 0, 0, 0.18)";
        case 8:
            return "0 0.695px 2.086px 0px rgba(0, 0, 0, 0.28), 0px 6.956px 9.739px 0px rgba(0, 0, 0, 0.18)";
        case 9:
            return "0 0.782px 2.347px 0px rgba(0, 0, 0, 0.28), 0px 7.826px 10.956px 0px rgba(0, 0, 0, 0.18)";
        case 10:
            return "0 0.869px 2.608px 0px rgba(0, 0, 0, 0.28), 0px 8.695px 12.173px 0px rgba(0, 0, 0, 0.18)";
        case 11:
            return "0 0.956px 2.869px 0px rgba(0, 0, 0, 0.28), 0px 9.565px 13.391px 0px rgba(0, 0, 0, 0.18)";
        case 12:
            return "0 1.043px 3.13px 0px rgba(0, 0, 0, 0.28), 0px 10.434px 14.608px 0px rgba(0, 0, 0, 0.18)";
        case 13:
            return "0 1.13px 3.391px 0px rgba(0, 0, 0, 0.28), 0px 11.304px 15.826px 0px rgba(0, 0, 0, 0.18)";
        case 14:
            return "0 1.217px 3.652px 0px rgba(0, 0, 0, 0.28), 0px 12.173px 17.043px 0px rgba(0, 0, 0, 0.18)";
        case 15:
            return "0 1.304px 3.913px 0px rgba(0, 0, 0, 0.28), 0px 13.043px 18.26px 0px rgba(0, 0, 0, 0.18)";
        case 16:
            return "0 1.391px 4.173px 0px rgba(0, 0, 0, 0.28), 0px 13.913px 19.478px 0px rgba(0, 0, 0, 0.18)";
        case 17:
            return "0 1.478px 4.434px 0px rgba(0, 0, 0, 0.28), 0px 14.782px 20.695px 0px rgba(0, 0, 0, 0.18)";
        case 18:
            return "0 1.565px 4.695px 0px rgba(0, 0, 0, 0.28), 0px 15.652px 21.913px 0px rgba(0, 0, 0, 0.18)";
        case 19:
            return "0 1.652px 4.956px 0px rgba(0, 0, 0, 0.28), 0px 16.521px 23.13px 0px rgba(0, 0, 0, 0.18)";
        case 20:
            return "0 1.739px 5.217px 0px rgba(0, 0, 0, 0.28), 0px 17.391px 24.347px 0px rgba(0, 0, 0, 0.18)";
        case 21:
            return "0 1.826px 5.478px 0px rgba(0, 0, 0, 0.28), 0px 18.26px 25.565px 0px rgba(0, 0, 0, 0.18)";
        case 22:
            return "0 1.913px 5.739px 0px rgba(0, 0, 0, 0.28), 0px 19.13px 26.782px 0px rgba(0, 0, 0, 0.18)";
        case 23:
            return "0 2px 6px 0px rgba(0, 0, 0, 0.28), 0px 20px 28px 0px rgba(0, 0, 0, 0.18)";
        default:
            return "none";
    }
};
