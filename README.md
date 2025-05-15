---
Author: 目棃
Description: 说明文档
Date: 2025-05-15
Update: 2025-05-15
---

> 本文档 [`Frontmatter`](https://github.com/BTMuli/MuCli#Frontmatter) 由 [MuCli](https://github.com/BTMuli/Mucli) 自动生成于 `2025-05-15 17:54:12`
>
> 更新于 `2025-05-15 17:54:12`

# Stylelint-Plugin-Color

Stylelint 插件，用于指定项目的颜色格式，**WIP**。

## 配置说明

- `format`: 颜色格式，为以下之一：
  - `hex`: 十六进制格式
  - `hexa`: 十六进制格式（带透明度）
  - `rgb`: RGB 格式
  - `rgba`: RGBA 格式
  - `hsl`: HSL 格式
  - `hsla`: HSLA 格式
- `case`: 颜色格式大小写，当 `format` 为 `hex` 或 `hexa` 时有效，为以下之一：
  - `lower`: 小写
  - `upper`: 大写

## 参考

- [stylelint-color-format](https://github.com/filipekiss/stylelint-color-format)

## LICENSE

本项目采用 [MIT](./LICENSE) 许可协议。
