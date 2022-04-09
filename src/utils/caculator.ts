import { RGBColor } from "react-color";

function _componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(color: RGBColor) {
    const hex =
        "#" +
        _componentToHex(color.r) +
        _componentToHex(color.g) +
        _componentToHex(color.b);
    if (color.a)
        return hex + _componentToHex(parseInt((color.a * 255).toFixed(0)));
    else return hex;
}

export function hexToRgb(hex: string) {
    const defauf = {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    };
    if (hex.length === 7) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : defauf;
    } else {
        const result =
            /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
                  a: parseInt(result[4], 16) / 255,
              }
            : defauf;
    }
}
