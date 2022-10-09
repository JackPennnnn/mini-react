import {REACT_TEXT} from "../constants";

// 如果是文本就转成对象
export function toObject(element) {
    return typeof element === 'string' || typeof element === 'number' ? {
        type: REACT_TEXT,
        content:element
    } : element
}