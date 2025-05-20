/**
 * @file tests/rule.test.js
 * @description 测试规则
 * @since 0.1.0
 */

import { testRuleConfigs } from "stylelint-test-rule-node";
import stylelintPluginColor from "../src/index";

const plugins = stylelintPluginColor;
const { ruleName } = stylelintPluginColor[0];

testRuleConfigs({
  plugins,
  ruleName,
  accept: [
    { config: true, description: "默认配置" },
    { config: [true], description: "默认配置" },
    { config: [true, "hexa"], description: "统一格式化为 hexa" },
  ],
  reject: [
    { config: "hexa" },
    { config: ["hexa"] },
    { config: [false, "hexa"] },
    { config: [true, ["hexa", "hex"]] },
    { config: [true, "hsl"] },
  ],
});
