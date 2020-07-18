import BankHeader from './components/BankHeader'

const components=[BankHeader]
const install=function(Vue,opts={}){
    components.forEach(component=>{
        Vue.component(component.name,component)
    })
}

export default{
    install
}