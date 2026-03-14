/**
 * 站点全局常量
 * 集中管理导航、社交链接、站点元信息等配置
 */

/** 主导航项 */
export const NAV_ITEMS = [
  { label: '~/home', href: '/' },
  { label: '~/about', href: '/about' },
]

/** 社交链接 */
export const SOCIAL_LINKS = [
  { label: 'github', url: 'https://github.com/foriLLL' },
  { label: 'email', url: 'mailto:1571825323@qq.com' },
  { label: 'leetcode', url: 'https://leetcode-cn.com/u/foril/' },
]

/** 站点名称 */
export const SITE_NAME = 'foril'

/** 站点标题（浏览器标签页） */
export const SITE_TITLE = 'foril — terminal blog'

/** 站点描述（SEO） */
export const SITE_DESCRIPTION = 'foril 的个人博客 — 终端风格'

/** 预估阅读速度（字/分钟），用于计算阅读时间 */
export const READING_SPEED = 500
