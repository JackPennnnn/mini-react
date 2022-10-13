import React from './packages/core/React';
import ReactDOM from './packages/core/react-dom';

// jsx
// let element = <h1 style={{color:'red'}}>Hello World</h1>
// babel => js方法 React.createElement() => vNode
let element2 = React.createElement('h1',{
    style:{
        color:'red'
    }
},'Hello World',React.createElement('span', {},66))

// 函数式组件？ 就是一个函数
// 特点：
// 1 函数组件的名称首字母大写 react原生组件 div span 自定组件大写
// 2 函数式组件的返回值 => jsx
// 3 jsx是一个父子结构（只有一个根）
// 4 还有一个属性props

// function Test(props){
//     return <h1>
//         <div>Test 23 {props.name}</div>
//     </h1>
// }
class Test extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return <h1><div>Test 23 {this.props.name}</div></h1>
    }
}

// 把vNode => 真实dom 放到指定的位置
ReactDOM.render(<Test name={'123456'}></Test>,
    document.getElementById('root'));

