// 上报数据方法
export function beaconRequset<T = any>(url: string, data: T) {
	const blob = new Blob([JSON.stringify(data)], {
		type: 'application/json; charset=UTF-8',
	})

	const res = navigator.sendBeacon(url, blob)

	return new Promise<boolean>((resolve, reject) => {
		if (res) resolve(true)

		reject()
	})
}

// 图片方式上报数据
export function imageRequest<T = any>(url: string, data: T) {
	const image = new Image()
	const query = JSON.stringify(data)

	return new Promise<boolean>((resolve, reject) => {
		image.src = `${url}?t=${Math.random()}r=${query}`

		image.onload = function () {
			resolve(true)
		}

		image.onerror = function () {
			reject()
		}
	})
}
