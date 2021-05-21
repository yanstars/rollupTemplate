
interface WaterOptions {
    watermark_txt: string
    watermark_objName?: string
    watermark_x?: number
    watermark_y?: number
    watermark_rows?: number
    watermark_cols?: number
    watermark_x_space?: number
    watermark_y_space?: number
    watermark_alpha?: number
    watermark_width?: number
    watermark_height?: number
    watermark_angle?: number
    watermark_color?: string
    watermark_fontsize?: string
    watermark_font?: string
}


export default class WaterMark {
    defaultSettings: WaterOptions = {
        watermark_objName: "",
        watermark_txt: "",
        watermark_x: -10,
        watermark_y: 40,
        watermark_rows: 0,
        watermark_cols: 0,
        watermark_x_space: 40,
        watermark_y_space: 40,
        watermark_color: '#d7d7d7',
        watermark_alpha: 0.30,
        watermark_fontsize: '12px',
        watermark_font: '微软雅黑',
        watermark_width: 100,
        watermark_height: 50,
        watermark_angle: 15 //水印倾斜度数
    };
    constructor(objConf: WaterOptions) {
        this.defaultSettings = Object.assign(this.defaultSettings, objConf)
        this.create()
        this.change()
    }
    init () {
        let watermark = document.getElementById('watermark')
        if (watermark) {
            watermark.remove()
        }
    }
    create () {
        const defaultSettings = this.defaultSettings

        this.init() // 页面水印初始化

        let content = defaultSettings.watermark_objName ? document.getElementById(defaultSettings.watermark_objName) : document.getElementsByTagName('html')[0]
        let oTemp = document.createElement('div') // 创建水印层节点
        oTemp.id = 'watermark'
        oTemp.style.pointerEvents = "none" // 禁用元素点击事件 使元素可以被点穿
        oTemp.style.position = content ? "absolute" : "fixed" // 背景层定位
        oTemp.style.top = "0" // 
        oTemp.style.bottom = "0" // 
        oTemp.style.left = "0" // 
        oTemp.style.right = "0" // 
        oTemp.style.zIndex = "10000000" // 


        // 获取目标区域最大宽度
        let page_width = content ? content.clientWidth : document.documentElement.clientWidth //Math.max(document.body.scrollWidth,document.body.clientWidth);

        // 获取目标区域最大长度
        let page_height = content ? content.clientHeight : document.documentElement.clientHeight //Math.max(document.body.scrollHeight,document.body.clientHeight);

        // 计算生产列数
        let createCols = defaultSettings.watermark_cols || (page_width - defaultSettings.watermark_x) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space)
        // 计算生成行数
        let createRows = defaultSettings.watermark_rows || (page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space)
        let x
        let y

        for (let i = 0; i < createRows; i++) {
            y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i

            for (let j = 0; j < createCols; j++) {

                x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j
                let mask_div = document.createElement('div')
                mask_div.id = 'mask_div' + i + j
                mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt))
                mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)"
                mask_div.style.visibility = ""
                mask_div.style.position = "absolute"
                mask_div.style.left = x + 'px'
                mask_div.style.top = y + 'px'
                mask_div.style.overflow = "hidden"
                mask_div.style.zIndex = "10000000"
                mask_div.style.opacity = defaultSettings.watermark_alpha + ''
                mask_div.style.fontSize = defaultSettings.watermark_fontsize
                mask_div.style.fontFamily = defaultSettings.watermark_font
                mask_div.style.color = defaultSettings.watermark_color
                mask_div.style.textAlign = "center"
                mask_div.style.width = defaultSettings.watermark_width + 'px'
                mask_div.style.height = defaultSettings.watermark_height + 'px'
                mask_div.style.display = "block"
                oTemp.appendChild(mask_div)
            };
        };
        //将水印添加到容器中
        content.appendChild(oTemp)
    }
    change () {
        window.onresize = () => {
            this.create()
        }
    }
}
