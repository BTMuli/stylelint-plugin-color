/**
 * @file src/utils/colorTransfer.ts
 * @description 颜色转换工具
 * @since 0.1.0
 */

import { colorCheck, ColorFormatEnum } from "./colorCheck";

/**
 * @description hex转hexa
 * @since 0.1.0
 * @param {string} color - 颜色字符串
 * @returns {string}
 */
function hex2hexa(color: string): string {
  const type = colorCheck(color);
  if (type !== ColorFormatEnum.HEX) {
    throw new Error(`Invalid color format: ${color}`);
  }
  const hex = color.slice(1).toLowerCase();
  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}ff`;
  }
  return `#${hex}ff`;
}
