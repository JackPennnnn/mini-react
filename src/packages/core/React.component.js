import {toVnode} from "./react-dom";

export const updateQueue = {
    isBatchData:false, // 标识 是同步更新还是异步更新
    updaters:[], // 需要更新的数组
    batchUpdate(){
        updateQueue.updaters.forEach(update => {
            update.updateComponent()
        })
        updateQueue.isBatchData = false
        updateQueue.updaters.length = 0
    }
}

//更新器
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance // 保存类的实例
        this.pendingState = [] // 保存数据
    }

    addState(partialState){
        this.pendingState.push(partialState)
    //    更新
        this.emitUpdate()
    }

    emitUpdate(){
    //     判断一下是异步还是同步
        if(updateQueue.isBatchData){ //异步
            updateQueue.updaters.push(this)
        }else{
            //    更新组件
            this.updateComponent()
        }
    }

    updateComponent(){
    //    获取到数据 => 更新组件
        if(this.pendingState.length > 0){
            shouldUpdate(this.classInstance,this.getState())
        }
    }

    getState(){ // 获取最新的数据
        const {pendingState,classInstance} = this
        let {state} = classInstance
        pendingState.forEach(nextState => {
            state = {...state, ...nextState}
        })
        // 清空数据
        pendingState.length = 0
        return state
    }
}

// 实现组件更新原理

//1 初始化
//2 更新的时候获取到新状态，把这个新的状态变成(vnode,在把这个vnode变成真实dom)
//3 用新的真实dom替换老的
function shouldUpdate(classInstance,nextState){
    classInstance.state = nextState

//    实现组件更新
    classInstance.forceUpdate()
}


class Component {
    static isReactComponent = true

    constructor(props) {
        this.props = props
        this.state = {}
        //    创建更新器
        this.updater = new Updater(this)
    }
    render(){

    }
    setState(partialState) {
        //    写一个更新器
        this.updater.addState(partialState)
    }

    forceUpdate(){
        //1新的vnode
        const newVnode = this.render()
        const oldVnode = this.oldRenderVnode // mountClassComponent里面有这个赋值
        const parentDom = oldVnode.dom
        toVnode(parentDom.parentNode,oldVnode,newVnode)
        this.oldRenderVnode = newVnode
    }
}

export default Component