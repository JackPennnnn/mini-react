import React from './packages/core/React';
import ReactDOM from 'react-dom';

// jsx
let element = <h1 style={{color:'red'}}>Hello World</h1>
// babel => js方法 React.createElement() => vNode
let element2 = React.createElement('h1',{
    style:{
        color:'red'
    }
},'Hello World',React.createElement('span',null,66))
console.log(element2)
// ReactDOM.render(element2,
//     document.getElementById('root'));

