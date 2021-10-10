import { resetRouter } from '@/router'

export function resetTokenAndClearUser() {
    // 退出登陆 清除用户资料
    localStorage.removeItem('merchantVerifyCode')
    localStorage.removeItem('userImg')
    localStorage.removeItem('merchantInfo')
    localStorage.removeItem('merchantId')
    localStorage.removeItem('merchantName')
    localStorage.removeItem('merchantStatus')
    // 重设路由
    resetRouter()
}

export const defaultDocumentTitle = 'YangYu'
export function getDocumentTitle(pageTitle) {
    if (pageTitle) return `${defaultDocumentTitle} - ${pageTitle}`
    return `${defaultDocumentTitle}`
}
