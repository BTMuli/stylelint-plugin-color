/**
 * @file src/rules/format.ts
 * @description 配置项-颜色格式
 * @since 0.1.0
 */

import stylelint, { type PostcssResult, type Rule } from "stylelint";
import { colorCheckType, ColorFormatEnum } from "../utils/colorCheck";

const ruleName = "color/format";
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (selector) => `不允许使用 ${selector} 颜色格式`,
});

const ruleFunction: Rule = (
  primary: ColorFormatEnum,
  secondaryOptions: any,
  context: any,
) => {
  return (
    root: { walkRules: (arg0: (ruleNode: any) => void) => void },
    result: PostcssResult,
  ) => {
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
      const colorNode = ruleNode.nodes.find(
        (node: { prop: string }) => node.prop === "color",
      );
      if (!colorNode) return;
      // 拿到color属性的值
      const colorValue = colorNode.value;
      const colorType = colorCheckType(colorValue, primary);
      if (!colorType) {
        stylelint.utils.report({
          ruleName,
          result,
          node: ruleNode,
          message: messages.rejected(colorValue),
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

const pluginColorFormat = stylelint.createPlugin(ruleName, ruleFunction);

export default pluginColorFormat;
