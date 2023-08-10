import React from './packages/core/React';
import ReactDOM from './packages/core/react-dom';

// jsx
// let element = <h1 style={{color:'red'}}>Hello World</h1>
// babel => js方法 React.createElement() => vNode
let element2 = React.createElement('h1', {
    style: {
        color: 'red'
    }
}, 'Hello World', React.createElement('span', {}, 66))

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

// 类组件ref 拿的是实例
// class TextInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.input = React.createRef()
//     }
//     getFocus () {
//         this.input.current.focus()
//     }
//     render(){
//         return <input ref={this.input} value={123}/>
//     }
// }

function TextInput(props,ref) {
    return (
    <input ref={ref} value={123}/>
    )
}

// 函数组件ref
const ForWardTextInput = React.forwardRef(TextInput)

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {num: 0}
        this.refTest = React.createRef()
        this.inputRef = React.createRef() //类的实例
    }

    handleClick = (event) => {
        // 异步：事件的函数和React内部方法
        // 同步：其他就是同步
        this.setState({
            num: this.state.num+1
        })
        this.setState({
            num: this.state.num+1
        })
        // this.inputRef.current.getFocus();
        this.inputRef.current.focus()
    }

    render(props) {
        return <h1>
            <div>{this.props.num}</div>
            {/*<div ref={this.refTest}>Test 23 {this.props.name} {this.state.num}</div>*/}
            <ForWardTextInput ref={this.inputRef}/>
            <button onClick={this.handleClick} type={'button'}>123456</button>
        </h1>
    }
}

// 嵌套组件
function Two(props){
    return <Test {...props} />
}

class One extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
        setTimeout(() => {
            this.setState({
                num:2
            })
        },1000)
    }
    render(){
        return <Two num={this.state.num}/>
    }
}

// 把vNode => 真实dom 放到指定的位置
// ReactDOM.render(<Test name={'123456'}></Test>,
//     document.getElementById('root'));

ReactDOM.render(<One />, document.getElementById('root'))
