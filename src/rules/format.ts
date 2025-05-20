/**
 * @file src/rules/format.ts
 * @description 配置项-颜色格式
 * @since 0.1.0
 */

import stylelint, { type PostcssResult, type Rule } from "stylelint";
import { canPassUnknown, checkColorFormat, colorCheck, ColorFormatEnum } from "../utils/colorCheck";

const ruleName = "color/format";
const messages = stylelint.utils.ruleMessages(ruleName, {
  warning: (color, fmt) => `Unknown color format ${fmt}:${color}`,
  rejected: (color, fmt, target) => `Invalid color format ${fmt}:${color}, please use ${target}`,
});
const meta = {
  url: "https://github.com/BTMuli/stylelint-plugin-color/blob/main/README.md",
  fixable: false,
};

const ruleFunction: Rule = (primary: ColorFormatEnum, secondaryOptions: any, context: any) => {
  return (root: { walkRules: (arg0: (ruleNode: any) => void) => void }, result: PostcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      { actual: primary },
      {
        actual: secondaryOptions,
        possible: (val: unknown) => {
          if (typeof val !== "string") return false;
          const list = [
            ColorFormatEnum.HEX,
            ColorFormatEnum.HEXA,
            ColorFormatEnum.RGB,
            ColorFormatEnum.RGBA,
          ];
          return list.includes(val as ColorFormatEnum);
        },
        optional: true,
      },
    );
    if (!validOptions) return;

    root.walkRules((ruleNode) => {
      // 拿到color属性
      const colorNode = ruleNode.nodes.find((node: { prop: string }) => node.prop === "color");
      if (!colorNode) return;
      const colorValue = colorNode.value;
      const colorFmt = colorCheck(colorValue);
      const colorTarget = secondaryOptions ?? ColorFormatEnum.HEXA;
      if (checkColorFormat(colorValue, colorFmt, colorTarget)) return;
      if (colorFmt === ColorFormatEnum.UNKNOWN) {
        if (canPassUnknown(colorValue)) return;
        stylelint.utils.report({
          ruleName,
          result,
          node: ruleNode,
          message: messages.warning(colorValue, colorFmt),
          severity: "warning",
        });
        return;
      }
      if (context.fix) {
        // TODO: 颜色格式转换
        return;
      }
      stylelint.utils.report({
        ruleName,
        result,
        node: ruleNode,
        message: messages.rejected(colorValue, colorFmt, colorTarget),
      });
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

const pluginColorFormat = stylelint.createPlugin(ruleName, ruleFunction);

export default pluginColorFormat;
