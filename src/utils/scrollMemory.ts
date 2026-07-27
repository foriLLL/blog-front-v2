/**
 * 滚动位置记忆工具
 * 滚动时把位置按路径持续存入 sessionStorage，
 * 浏览器前进/后退（popstate）导航时恢复，避免返回列表后回到顶部
 */

const SCROLL_KEY_PREFIX = 'blog:scroll:'

/**
 * _app 内容区根容器 id。
 * 布局上 html/body 禁止滚动，各页面又在内容区内部使用自己的滚动容器
 * （列表页 .container、文章页 .main），因此需动态定位当前实际滚动的元素
 */
export const SCROLL_ROOT_ID = 'page-scroll-container'

/**
 * 最近一次 popstate 导航发生的时间戳，0 表示本次会话内未发生。
 * 模块级变量即可：整页刷新后自然清零，不会误恢复
 */
let popNavAt = 0

/** 标记发生了浏览器前进/后退导航（在 router.beforePopState 中调用） */
export function markPopNavigation() {
  popNavAt = Date.now()
}

/**
 * 判断当前是否处于 popstate 导航后的短暂窗口内。
 * 窗口需要覆盖路由切换期间的数据拉取耗时，故设得较宽松
 */
export function isPopNavigation(windowMs = 5000): boolean {
  return popNavAt > 0 && Date.now() - popNavAt < windowMs
}

/** 找到内容区里当前实际发生滚动的元素 */
function getScrollContainer(): HTMLElement | null {
  const root = document.getElementById(SCROLL_ROOT_ID)
  if (!root) return null
  if (root.scrollHeight > root.clientHeight) return root
  const inner = Array.from(root.querySelectorAll<HTMLElement>('*')).find(
    el =>
      el.scrollHeight > el.clientHeight &&
      /(auto|scroll)/.test(getComputedStyle(el).overflowY),
  )
  return inner ?? root
}

/** 保存指定路径的滚动位置 */
export function saveScrollPosition(path: string, scrollTop: number) {
  try {
    sessionStorage.setItem(SCROLL_KEY_PREFIX + path, String(scrollTop))
  } catch {
    // sessionStorage 不可用（如隐私模式）时放弃记忆，不影响正常导航
  }
}

/** 当前滚动位置，供页面卸载前兜底保存 */
export function getCurrentScrollTop(): number {
  return getScrollContainer()?.scrollTop ?? 0
}

/** 读取指定路径保存的滚动位置，无记录时返回 null */
export function getSavedScrollPosition(path: string): number | null {
  try {
    const saved = sessionStorage.getItem(SCROLL_KEY_PREFIX + path)
    return saved === null ? null : Number(saved)
  } catch {
    return null
  }
}

export function restoreScrollPosition(y: number, retriesLeft = 30) {
  const container = getScrollContainer()
  if (!container) return
  // 数据到达前列表高度不足，直接滚动会被浏览器钳制丢失，等高度足够再滚
  if (container.scrollHeight < y && retriesLeft > 0) {
    requestAnimationFrame(() => restoreScrollPosition(y, retriesLeft - 1))
    return
  }
  container.scrollTo({ top: y })
}
