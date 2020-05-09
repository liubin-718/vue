// 动态引入modules内文件
const files = require.context('./modules', true, /\.js$/)
const api = files.keys().reduce((api, filePath) => {
    const fileName = filePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = files(filePath)
    api[fileName] = value.default
    return api
}, {})
const apiList = []
for(const item in api){
    Object.assign(apiList, api[item])
}

const install = (Vue) => {
    if(install.installed) return
    install.installed = true
    // 定义属性到Vue原型
    Object.defineProperties(Vue.prototype, {
        $api: {
            get(){
                return apiList
            }
        }
    })
}
export default{
    install
}