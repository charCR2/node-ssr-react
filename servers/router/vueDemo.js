
export const vueHandleDefault = function (req, res, store) {
    const { city } = req.query
    console.log(req.query, 111)
    // city && 
    // 服务端向store注入city为长沙
    store.commit('changeCity', '广州')
    return store
}