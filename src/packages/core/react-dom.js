// 初始化react元素

import {REACT_TEXT} from "../constants";
import addEvent from './event'
function render(vdom, container) {
    mount(vdom, container)
}

function mount(vdom, container) {
    // 1 vdom => 真实dom
    let newDom = createDom(vdom)
    // 2 真实dom放到对应位置
    container.appendChild(newDom)
}

function createDom(vdom) {
    // vdom => 真实dom
    let {type, props} = vdom
    let dom

    if (type) {
        // 1. 判断type => 文本或者元素
        if (type === REACT_TEXT) {
            dom = document.createTextNode(vdom.content)
        } else if (typeof type === 'function') {
            if (type.isReactComponent) { // 类组件
                return mountClassComponent(vdom)
            }
            return mountFunctionComponent(vdom)
        } else {
            dom = document.createElement(type)
        }
    } else {
        //    2. 没有就当成文本
        dom = document.createTextNode(vdom)
    }

    // 2. 处理属性
    if (props) {
        updateProps(dom, {}, props) // 真实dom，旧的属性，新的属性
        let children = props.children
        if (children) {
            changeChildren(children, dom)
        }
    }

    vdom.dom = dom //保存真实dom
    return dom
}

// 更新属性
function updateProps(dom, oldProps, newProps) {
    for (let key in newProps) {
        // 注意children
        if (key === 'children') {
            continue
        } else if (key === 'style') {
            // 遍历style
            let styleObject = newProps[key]
            for (let arr in styleObject) {
                dom.style[arr] = styleObject[arr]
            }
        } else if (key.startsWith('on')) {
            // dom[key.toLocaleLowerCase()] = newProps[key]
        //     以后不再把事件绑定在dom，而是通过事件委托，全部放到document上
            addEvent(dom,key.toLocaleLowerCase(),newProps[key])
        } else { //其他属性
            dom[key] = newProps[key]
        }
    }

    // 更新处理
    if (oldProps) {
        // 旧的属性在新的属性中没有 =》 删除
        for (let key in oldProps) {
            if (!newProps[key]) {
                dom[key] = null
            }
        }
    }
}

// 处理children
function changeChildren(children, dom) {
    // 1. 有一个child
    if (typeof children === 'object' && children.type) {
        mount(children, dom)
    } else if (Array.isArray(children)) { // 2. 有多个children []
        children.forEach(item => render(item, dom))
    }

}

// 处理函数式组件
function mountFunctionComponent(vdom) {
    let {type, props} = vdom
    let functionVdom = type(props)
    return createDom(functionVdom)
}

// 处理类组件
function mountClassComponent(vdom) {
    let {type, props} = vdom
//    type是一个类
    let classComponentInstance = new type(props)
    let classComponentVnode = classComponentInstance.render()
    classComponentInstance.oldRenderVnode = classComponentVnode
    return createDom(classComponentVnode)
}

export function toVnode(parentDom, oldVnode, newVnode) {
    const newDom = createDom(newVnode)
    const oldDom = oldVnode.dom
//     更新
    parentDom.replaceChild(newDom, oldDom)
}

const ReactDom = {
    render
}

export default ReactDom