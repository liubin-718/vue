import ajax from 'utils/ajax'

export default{
    queryBillList: data => {
        const prefix = process.env.NODE_ENV !== 'production' ? '/lb' : `${ENV_CONFIG.base_url}app`
        return ajax({
            url: `${prefix}/electronicBill/queryBillList`,
            method: 'post',
            data
        })
    }
}