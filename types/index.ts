export type MonitorOption = {
	repartURL: string // 上报地址
	transform?: (...args: any[]) => any
	mode?: 'img' | 'beacon'
	maxCount?: number
}

type PluginInstallFunction<Options> = Options extends unknown[]
	? (app: Mointer, ...options: Options) => any
	: (app: Mointer, options: Options) => any

export type Plugin<Options = any[]> =
	| (PluginInstallFunction<Options> & { install?: PluginInstallFunction<Options> })
	| { install: PluginInstallFunction<Options> }

export type MointerData = Record<any, any>

export interface RepartOption {
	immediate?: boolean
}

export interface Mointer {
	data: MointerData[]

	config: MonitorOption

	dataTransform(data: any): any

	request(rest: any): Promise<boolean>
	repart(data: MointerData, options?: RepartOption): void

	use<Options extends unknown[]>(plugin: Plugin<Options>, ...options: Options): this
	use<Options>(plugin: Plugin<Options>, options: Options): this
}

export type BrowserType = 'Opera' | 'IE' | 'Firefox' | 'Safari' | 'Chrome'
