Introduction
A lightweight Chrome extension. Hold the Ctrl key and right-click any element on a page to highlight it briefly and copy its outerHTML to the system clipboard. A short toast notification appears at the top of the page to indicate success or failure.

Key Features
- Hold Ctrl + right-click: copies the clicked element’s outerHTML to the clipboard.
- Visual highlight: the copied element gains a temporary red dashed outline.
- Toast notifications: a short success or error message appears at the top center of the page.
- Coverage: injected as a content script to match all pages (manifest uses <all_urls>).

Files
- manifest.json: extension configuration (manifest_version: 3). Declares permissions (activeTab, clipboardWrite, scripting) and content_scripts (content.js, styles.css, run_at=document_start).
- content.js: core logic. Listens for contextmenu events (capture phase), checks event.ctrlKey, prevents default behavior, obtains target.outerHTML, uses navigator.clipboard.writeText to copy, shows toast, and temporarily adds a highlight class to the element.
- styles.css: styles for the highlight (.ext-copy-highlight) and the toast (.ext-copy-toast).

Installation (Developer mode)
1. Open chrome://extensions/ in Chrome.
2. Enable "Developer mode" in the top-right.
3. Click "Load unpacked" and select the folder containing manifest.json, content.js, and styles.css.
4. After loading, test by holding Ctrl and right-clicking elements on any webpage.

Usage
- Hold Ctrl and right-click a target element (button, image, paragraph, etc.).
- The element will be briefly highlighted, a “Element copied!” toast appears, and the element’s outerHTML is copied to the clipboard.
- If copying fails, an error will be logged in the console and a red error toast will display (“Copy failed, please try again”).

Troubleshooting & Tips
- “Copy failed, please try again”:
  - Check the console for detailed errors (Right-click → Inspect → Console).
  - navigator.clipboard may require a secure context (HTTPS) or specific extension environment; most extension contexts allow it, but some pages can block clipboard access.
  - Browser handling of right-click/contextmenu and “user gesture” rules can affect clipboard access. Consider alternative triggers (e.g., click + modifier) or adding a fallback using document.execCommand('copy').
- No highlight or toast:
  - Ensure styles.css is listed in manifest and is being injected.
  - The toast uses a very high z-index (2147483647), so it’s unlikely to be covered, but page CSS could still interfere.
- Extension doesn’t work on some pages (e.g., Chrome Web Store or other restricted pages):
  - Chrome disallows script injection on certain internal or restricted pages; this is expected.

Customization Suggestions
- Change trigger key: modify if (!event.ctrlKey) return; in content.js to use event.shiftKey, event.altKey, or a custom condition.
- Change copied content: replace const htmlContent = target.outerHTML; with target.innerHTML, target.textContent, or target.getAttribute('...') as needed.
- Edit styles: tweak .ext-copy-toast and .ext-copy-highlight in styles.css to change visuals or animations.
- Add clipboard fallback: implement a textarea + document.execCommand('copy') fallback when navigator.clipboard.writeText fails.

Security & Permissions
- The extension requests minimal permissions: activeTab, clipboardWrite, scripting. It injects a content script and performs copy operations. Be mindful that copying HTML can include sensitive content present on the page.

License
- If you publish or modify this project, indicate the source and choose an appropriate open-source license (e.g., MIT, Apache 2.0) as needed.

If you’d like, I can:
- Change the trigger key or the type of content copied;
- Add a robust fallback for clipboard copying to improve compatibility;
- Create a polished Chrome Web Store description for publishing.


简介
这是一个轻量的 Chrome 扩展。按住 Ctrl 键并右键点击页面上的任意元素，扩展会高亮该元素并将其 outerHTML 复制到系统剪贴板，同时在页面顶部显示短暂提示（toast）。

主要功能
- 按住 Ctrl + 右键：复制被点击元素的 outerHTML 到剪贴板。
- 可视高亮：被复制的元素会短暂添加红色虚线高亮样式，提示用户已选中。
- 页面提示：顶部中心显示成功或失败提示信息（自动消失）。
- 兼容性：通过 content script 注入，匹配所有页面（manifest 中使用 <all_urls>）。

文件说明
- manifest.json：扩展配置（manifest_version: 3），声明了 permissions（activeTab、clipboardWrite、scripting）和 content_scripts（content.js、styles.css，run_at=document_start）。
- content.js：核心逻辑。监听 contextmenu 事件（捕获阶段），在检测到 event.ctrlKey 时阻止默认行为、获取 target.outerHTML、使用 navigator.clipboard.writeText 复制并调用 showToast 显示提示，同时给元素添加临时高亮类。
- styles.css：高亮样式（.ext-copy-highlight）和提示条样式（.ext-copy-toast）。

安装（开发者模式）
1. 在 Chrome 地址栏打开 chrome://extensions/。
2. 右上角开启 “开发者模式”。
3. 点击 “加载已解压的扩展程序（Load unpacked）” ，选择包含 manifest.json、content.js、styles.css 的文件夹。
4. 安装完成后在任意网页尝试按住 Ctrl 键并右键点击元素进行测试。

使用方法
- 在任何页面上，按住 Ctrl 键并右键点击目标元素（例如某个按钮、图片、段落等）。
- 元素会短暂高亮，页面顶部会出现 “元素已复制！” 的提示，并将该元素的 outerHTML 内容复制到剪贴板。
- 若复制失败，会在控制台打印错误并显示红色错误提示（“复制失败，请重试”）。

常见问题与排查建议
- 未复制成功或提示“复制失败，请重试”：
  - 请在控制台查看具体错误（右键 → 检查 → Console）。
  - navigator.clipboard API 需在安全上下文下（HTTPS）或扩展环境中运行；扩展中通常可用，但个别页面可能拦截或阻止剪贴板访问。
  - 有时浏览器对右键/上下文菜单事件的处理与“用户手势”判断有关。如遇问题，可尝试在 content.js 中改用其他触发方式（例如点击 + 键修饰）或实现 execCommand('copy') 作为回退方案。
- 未看到高亮或提示：
  - 确认 styles.css 已随 content script 注入（manifest 中列出）。
  - 检查 z-index 是否被页面样式覆盖；提示使用了非常高的 z-index（2147483647），一般不会被覆盖。
- 扩展不工作在某些页面（如 Chrome 的扩展商店或特殊权限页面）：
  - Chrome 对扩展注入在某些内部页面或受限页面上有限制，这是正常行为。

自定义建议
- 更改触发组合键：编辑 content.js 中的 if (!event.ctrlKey) return; 可替换为 event.shiftKey、event.altKey 或自定义组合逻辑。
- 复制内容类型：当前复制 outerHTML，如需复制 innerHTML、textContent 或某些属性，可替换 const htmlContent = target.outerHTML; 为 target.innerHTML / target.textContent / target.getAttribute('...') 等。
- 提示样式与高亮：修改 styles.css 中 .ext-copy-toast 与 .ext-copy-highlight 来调整样式、动画或显示位置。
- 兼容性回退：如需更稳妥的剪贴板兼容性，可在复制失败时使用创建 textarea + document.execCommand('copy') 的回退方案。

安全与权限说明
- 本扩展请求的权限较少：activeTab、clipboardWrite、scripting。仅注入 content script 到页面并执行复制操作。请仅在信任的环境中使用并意识到复制 HTML 可能包含敏感信息（例如页面中隐藏或私有数据）。

许可
- 如需发布或修改，请在项目中注明来源并根据您的需要选择合适的开源许可（例如 MIT、Apache 2.0 等）。

如果需要，我可以：
- 根据你的偏好修改触发键或复制内容类型；
- 增加回退的复制实现以提高兼容性；
- 生成一个完整的发布说明（Chrome Web Store 描述文本）。
