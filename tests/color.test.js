/**
 * @file tests/color.test.js
 * @description 测试 color 规则
 * @since 0.1.0
 */
import { testRule } from "stylelint-test-rule-node";
import stylelintPluginColor from "src";

const plugins = [stylelintPluginColor];
const {
  ruleName,
  rule: { messages },
} = stylelintPluginColor;

testRule({
  plugins,
  ruleName,
  config: [true],
  fix: true,
  accept: [
    {
      code: ".class {}",
      description: "accept empty rule",
    },
    {
      code: ".class {color: #000;}",
      description: "accept color",
    },
  ],
});
