/**
 * @file tests/color.test.js
 * @description 测试 color 规则
 * @since 0.1.0
 */
import { testRule } from "stylelint-test-rule-node";
import stylelintPluginColor from "../src/index.js";
import { ColorFormatEnum } from "../src/utils/colorCheck.js";

const plugins = [stylelintPluginColor];
const {
  ruleName,
  rule: { messages },
} = stylelintPluginColor;

testRule({
  plugins,
  ruleName,
  config: [true],
  fix: false,
  accept: [
    {
      code: ".class {color: #66ccffff;}",
    },
  ],
  reject: [
    {
      code: ".class {color: red;}",
      message: messages.rejected(
        "red",
        ColorFormatEnum.UNKNOWN,
        ColorFormatEnum.HEXA,
      ),
    },
    {
      code: ".class {color: #000;}",
      message: messages.rejected(
        "#000",
        ColorFormatEnum.HEX,
        ColorFormatEnum.HEXA,
      ),
    },
    {
      code: ".class {color: rgb(0, 0, 0);}",
      message: messages.rejected(
        "rgb(0, 0, 0)",
        ColorFormatEnum.RGB,
        ColorFormatEnum.HEXA,
      ),
    },
    {
      code: ".class {color: rgb(0 0 0 / 0);}",
      message: messages.rejected(
        "rgb(0 0 0 / 0)",
        ColorFormatEnum.RGBA,
        ColorFormatEnum.HEXA,
      ),
    },
    {
      code: ".class {color: rgba(0, 0, 0, 0);}",
      message: messages.rejected(
        "rgba(0, 0, 0, 0)",
        ColorFormatEnum.RGBA,
        ColorFormatEnum.HEXA,
      ),
    },
    {
      code: ".class {color: hsl(0, 0%, 0%);}",
      message: messages.rejected(
        "hsl(0, 0%, 0%)",
        ColorFormatEnum.UNKNOWN,
        ColorFormatEnum.HEXA,
      ),
    },
  ],
});
