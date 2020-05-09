import Mock from 'mockjs'
import {createReturnData} from './uilts'

const historyBill = {
    url: '/electronicBill/queryList',
    type: 'post',
    response: function(config){
        let {turnPageBeginPos, turnPageShowNum} = config.body
        if(!turnPageBeginPos) turnPageBeginPos = 1
        if(!turnPageShowNum) turnPageShowNum = 10
        let pageList = []
        for(let i=0; i<100; i++){
            pageList.push(Mock.mock({
                'name': /姓名[a-z]{5}/,
                'age': /[1-9]{2}/
            }))
        }
        pageList = pageList.filter((item, index)=>{
            index < turnPageShowNum * turnPageBeginPos && index >= turnPageShowNum * (turnPageBeginPos - 1)
        })
        return createReturnData({
            'turnPageTotalNum': 100,
            billMessageList: pageList
        })
    }
}

export default[
    historyBill
]