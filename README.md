---
Author: 目棃
Description: 说明文档
Date: 2025-05-15
Update: 2025-05-20
---

> 本文档 [`Frontmatter`](https://github.com/BTMuli/MuCli#Frontmatter) 由 [MuCli](https://github.com/BTMuli/Mucli) 自动生成于 `2025-05-15 17:54:12`
>
> 更新于 `2025-05-20 19:59:20`

# Stylelint-Plugin-Color

Stylelint 插件，用于指定项目的颜色格式，**WIP**。

- [x] 支持 `hex`、`hexa`、`rgb`、`rgba` 格式校验
- [ ] 支持 `stylelint --fix` 自动修复

## 安装

参考 [BTMuli/TeyvatGuide@f75f982d](https://github.com/BTMuli/TeyvatGuide/commit/f75f982d84787920cb2234f79e4e9baee8beb1c6)

```bash
pnpm i @btmuli/stylelint-plugin-color -D
```

## 配置说明


```yaml
plugins:
  - "@btmuli/stylelint-plugin-color"
rules:
  color/format:
    - true
    - hexa
```

- `format`: 颜色格式，为以下之一：
  - `hex`: 十六进制格式
  - `hexa`: 十六进制格式（带透明度）
  - `rgb`: RGB 格式
  - `rgba`: RGBA 格式

## 参考

- [stylelint-color-format](https://github.com/filipekiss/stylelint-color-format)
- [stylelint-order](https://github.com/hudochenkov/stylelint-order)

## LICENSE

本项目采用 [MIT](./LICENSE) 许可协议。
