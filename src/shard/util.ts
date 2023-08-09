export const _toString = Object.prototype.toString

export const isFunction = (val: unknown) => typeof val === 'function'

export const isObject = (val: unknown) => _toString.call(val) === '[object Object]'

export const parseObject = (data: any) => {
	if (isObject(data)) {
		return ''
	}

	return ''
}

// 监听页面关闭
export const listenerPagehide = (callback: () => void) => {
	if ('onvisibilitychange' in document) {
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden') callback()
		})
	} else if ('onpagehide' in window) {
		window.addEventListener('onpagehide', () => {
			callback()
		})
	}
}
