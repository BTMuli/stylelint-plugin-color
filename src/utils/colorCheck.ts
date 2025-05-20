/**
 * @file src/utils/colorCheck.ts
 * @description 颜色格式检查工具
 * @since 0.1.0
 */

/**
 * @description 颜色格式类型枚举
 * @enum {string} ColorFormatEnum
 * @since 0.1.0
 * @todo 目前只打算支持 HEX、HEXA、RGBA、RGB 的互转
 * @see {@link https://www.w3.org/TR/css-color-4/#typedef-color}
 * @property {string} HEX - 十六进制颜色格式
 * @property {string} HEXA - 十六进制透明度颜色格式
 * @property {string} RGB - RGB颜色格式
 * @property {string} RGBA - RGB颜色格式
 * @property {string} UNKNOWN - 未知颜色格式
 */
export const enum ColorFormatEnum {
  HEX = "hex",
  HEXA = "hexa",
  RGB = "rgb",
  RGBA = "rgba",
  UNKNOWN = "unknown",
}

/**
 * @description 根据传入字符串判断颜色格式
 * @since 0.1.0
 * @param {string} color - 颜色字符串
 * @returns {ColorFormatEnum} 颜色格式枚举
 */
export function colorCheck(color: string): ColorFormatEnum {
  const reg = {
    [ColorFormatEnum.HEX]: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    [ColorFormatEnum.HEXA]: /^#[0-9a-fA-F]{8}$/,
    [ColorFormatEnum.RGB]: /^(rgb|RGB)\(\s*(\d{1,3}\s*,\s*){2}\d{1,3}\s*\)$/,
    [ColorFormatEnum.RGBA]: /^(rgba|RGBA)\(\s*(\d{1,3}\s*,\s*){3}(\d|1\d|2[0-5]{2})\s*\)$/,
  };
  for (const key in reg) {
    if (reg[key as keyof typeof reg].test(color)) {
      return key as ColorFormatEnum;
    }
  }
  // rgb(0 0 0 / 0%)
  if (
    /^(rgb|RGB)\(\s*(\d{1,3}\s+){2}(\d|1\d|2[0-5]{2})\s*\/\s*(\d{1,3}\s+)?\d{1,3}\s*\)$/.test(color)
  ) {
    return ColorFormatEnum.RGBA;
  }
  return ColorFormatEnum.UNKNOWN;
}

// export function getColorAlpha(color: string, fmt: ColorFormatEnum): string {
//   if (![ColorFormatEnum.RGBA, ColorFormatEnum.HEXA].includes(fmt)) return "1";
//   if (fmt === ColorFormatEnum.HEXA) {
//
//   }
// }

/**
 * @description 校验颜色是否符合格式
 * @since 0.1.0
 * @param {string} color - 颜色字符串
 * @param {ColorFormatEnum} fmt - 颜色格式枚举
 * @param {ColorFormatEnum} target - 目标颜色格式枚举
 * @returns {boolean} 是否符合格式
 */
export function checkColorFormat(
  color: string,
  fmt: ColorFormatEnum,
  target: ColorFormatEnum,
): boolean {
  // 如果fmt和target相同，直接返回true
  if (fmt === target) return true;
  // 如果目标格式是hex，当前格式是hexa，且最后面不是ff，返回true
  if (target === ColorFormatEnum.HEX && fmt === ColorFormatEnum.HEXA) {
    return color.slice(-2).toLowerCase() === "ff";
  }
  // 如果目标格式是rgb，当前格式是rgba
  if (target === ColorFormatEnum.RGBA && fmt === ColorFormatEnum.RGB) {
    const alpha = color.match(/\/\s*(\d{1,3}\s+)?\d{1,3}\s*\)/);
    if (alpha) {
      const alphaValue = alpha[0].match(/(\d{1,3}\s+)?\d{1,3}/);
      if (alphaValue) {
        const value = parseFloat(alphaValue[0]);
        // 如果透明度不等于1，返回true
        if (value !== 1) return true;
      }
    }
  }
  // 返回false
  return false;
}
