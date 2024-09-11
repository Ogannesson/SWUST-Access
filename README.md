# SWUST Access

**SWUST Access** 是一个 Chrome 扩展，帮助用户在访问特定网站时控制 HTTP 和 HTTPS 之间的自动重定向，特别适用于需要在 HTTP 协议下访问的站点。

## 功能简介

- **自定义域名重定向规则**：用户可以添加自定义域名，将对特定 HTTPS 网站的请求重定向为 HTTP。
- **预定义域名支持**：扩展内置了若干西南科技大学一站式服务大厅的相关域名，确保用户访问这些站点时使用 HTTP。

## 安装与使用

### Chrome 浏览器安装

1. **通过 Chrome 应用商店安装**：
   - 前往 [Chrome 应用商店](https://chromewebstore.google.com/detail/swust-access/podfakoeacbcjhbenlffdajkakfmiggn) 下载并安装扩展（需要能够访问Google的网络）。

2. **手动安装扩展**：
   - 从 Releases 中下载 `.crx` 文件。
   - 在 Chrome 地址栏中输入 `chrome://extensions/`，打开页面。
   - 打开右上角的 `开发者模式` 开关。
   - 将下载的 `.crx` 文件拖入页面进行手动安装。

3. **通过安装脚本安装**：
   - 下载 Releases 中的 [`Auto-Install.zip`](https://github.com/Unbiseptium/SWUST-Access/releases/download/%E6%9C%80%E6%96%B0%E5%8F%91%E8%A1%8C%E7%89%88/Auto-Install.zip)。
   - 解压后双击运行 `install.bat`，并按照提示给予安装脚本管理员权限。
   - 插件文件会自动安装至 `C:\Program Files\SWUST Access` 目录。
   - 若需卸载扩展，请运行该目录下的 `uninstall.bat`，请勿手动移除扩展，避免被 Chrome 计入黑名单。

### Edge 浏览器安装

1. **通过 Edge 加载项商店安装**：
   - 前往 [Edge 加载项](https://microsoftedge.microsoft.com/addons/detail/swust-access/moaflpnlifgfbakgkcladlddofljfioi) 下载并安装扩展。

2. **手动安装扩展（不推荐）**：
   - 与 Chrome 手动安装类似，从 Releases 中下载 `.crx` 文件。
   - 在 Edge 地址栏中输入 `edge://extensions/`，打开页面。
   - 打开右上角的 `开发者模式` 开关。
   - 将下载的 `.crx` 文件拖入页面进行手动安装。

### 启用与使用

1. **启用扩展**：
   - 安装完成后，点击浏览器工具栏中的扩展图标，打开扩展弹窗。
   - 使用切换开关开启或关闭扩展功能。

2. **添加域名规则**：
   - 在扩展的弹窗中，用户可以通过文本框输入多个域名（使用 `;` 或换行分隔）。
   - 输入完成后，点击文本框外任意区域，扩展会自动保存设置。
   - 扩展会自动对这些域名进行 HTTPS 到 HTTP 的重定向处理。


## 权限说明

为了确保扩展功能正常运作，**SWUST Access** 需要以下权限：

- **`storage`**：用于存储用户自定义的域名规则，并通过 `chrome.storage.sync` 功能在多设备之间同步这些设置。
- **`declarativeNetRequest`**：用于动态管理和应用用户自定义的网络请求规则，实现 HTTPS 到 HTTP 的重定向功能。
- **`host_permissions`**：扩展允许用户自定义域名规则，因此需要访问用户指定的任意网站，并对这些网站的请求进行处理。

## 如何贡献

如果您对该扩展有改进建议或发现了问题，欢迎通过以下方式参与贡献：

1. 克隆代码库：

    ```bash
    git clone https://github.com/your-repo/swust-access.git
    ```

2. 创建一个新的分支并进行修改：

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. 提交修改并创建 Pull Request。

## 开发者

- [**Zky**](https://github.com/Unbiseptium) - 开发与维护
  
## 灵感来源于

Chrome 应用商店拓展程序 [URL Rule](https://chromewebstore.google.com/detail/url-rule/enfdapnpdfpgjamddpkdfliienniaimb)

## 许可协议

该项目基于 [MIT 许可证](LICENSE) 开源。
