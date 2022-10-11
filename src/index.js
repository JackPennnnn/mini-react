import React from './packages/core/React';
import ReactDOM from './packages/core/react-dom';

// jsx
let element = <h1 style={{color:'red'}}>Hello World</h1>
// babel => js方法 React.createElement() => vNode
let element2 = React.createElement('h1',{
    style:{
        color:'red'
    }
},'Hello World',React.createElement('span', {},66))

// 把vNode => 真实dom 放到指定的位置
ReactDOM.render(element2,
    document.getElementById('root'));

