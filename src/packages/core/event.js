import {updateQueue} from "./React.component";

/**
 *
 * @param dom 真实dom
 * @param eventType 事件类型
 * @param handler 事件的处理函数
 */
export default function addEvent(dom, eventType, handler) {
    let store = dom.store || (dom.store = {})
//     创建映射表
    store[eventType] = handler
    if (store[eventType]) {
        document[eventType] = dispatchEvent //将dom上的事件放到domcument
    }
}

function dispatchEvent(event) {
    let {target, type} = event //event事件对象

    let eventType = `on${type}`

    let {store} = target

    let handler = store && store[eventType]
    // 合并事件对象 包装一下
    let SyntheticBaseEvent = createBaseEvent(event)
    updateQueue.isBatchData = true
    handler && handler(SyntheticBaseEvent)
    updateQueue.isBatchData = false
    updateQueue.batchUpdate()
}

// 兼容
function createBaseEvent(nativeEvent){
    let syntheticBaseEvent = {}
    for(let key in nativeEvent){

        syntheticBaseEvent[key] = nativeEvent[key]
    }
    syntheticBaseEvent.nativeEvent = nativeEvent
    // 兼容处理
    syntheticBaseEvent.preventDefault = preventDefault
    return syntheticBaseEvent
}

// 处理 默认事件
function preventDefault(event){
    if(!event){ // 兼容ie
        window.event.returnValue = false
    }
    if(event.preventDefault){
        event.preventDefault()
    }
}