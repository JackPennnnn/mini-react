// jsx => babel
import {REACT_ELEMENT, REACT_FORWARD_REF} from "../constants";
import { toObject } from "../utils";
import Component from "./React.component";

function createElement(type, config, children) {
    // 处理key ref
    let key,ref
    if(config){
        key = config.key
        ref = config.ref
        delete config.key
        delete config.ref

    }

    // 处理children
    let props = {...config}
    if(config){
        // 1. 没有children
        // 2. 有一个 (1) 文本 (2) 元素
        // 3. 多个儿子
        if(arguments.length > 3){ // 多个儿子
            props.children = Array.prototype.slice.call(arguments,2).map(item => toObject(item))
        }else if(arguments.length === 3){ // 只有一个儿子
            props.children = toObject(children)
        }
    }
    return { // vNode => React 元素
        $$typeof:REACT_ELEMENT,
        key, //后面diff
        ref, //获取到真实dom
        type,//类型 div..
        props
    }
}

function createRef(){
    return {
        current:null
    }
}

function forwardRef(render){
    return {
        $$typeofs:REACT_FORWARD_REF,
        render
    }
}

const React = {
    createElement,
    Component,
    createRef,
    forwardRef
}

export default React