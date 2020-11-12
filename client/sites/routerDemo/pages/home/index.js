import React from 'react'
import "./index.scss"

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            arr: []
        }
    }

    componentDidMount() {
        let arr = []
        
        for(let i = 0; i < 100; i++){
            arr[i] = i
        }
        setTimeout(() => {
            this.setState({ arr })
        },1000)
        setTimeout(() => {
            console.log(1)
            document.getElementById('input').value = 2
        },1001)
    }

    handleInput = (e) => {
        this.setState({
            input: e.target.value
        })
    }


    render(){
        const { input, arr } = this.state

        return (
            <div className="test test2">
                <input value={input} onChange={this.handleInput} id="input"></input>
                <div className="content">
                {
                    arr.map((item) => {
                        return( <ColorBox item={item} key={item}></ColorBox>)
                    })
                }   
                </div>
            </div>
        )
    }
}

class ColorBox extends React.Component {

    componentWillReceiveProps(nextProps) {
        
    }
    render(){
        const {item} = this.props;
        console.log(2)
        return (<div style={{
            background: randomHexColor(),
            display:'inline-block',
            height:'20px',
            width:'100px',
            lineHeight:'20px',
            textAlign:'center',}}>{item}</div>)

    }
    
}

function randomHexColor() {
    return "#" + ("0000" + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}