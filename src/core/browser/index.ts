import type { Mointer } from 'types'
import UAParser from 'ua-parser-js'

export default function browser(moniter: Mointer) {
	const ua = UAParser(navigator.userAgent)

	const format = () => {
		return moniter.dataTransform ? moniter.dataTransform(ua) : ua
	}

	const key = 'M_1'

	// 存在说明上报过了
	// if (sessionStorage.getItem(key)) return

	moniter.request(format()).then((res) => {
		if (res) {
			sessionStorage.setItem(key, '1')
		}
	})
}
