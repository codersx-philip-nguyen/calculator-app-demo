import React, {Component} from 'react';
import Button from './components/Button';
import './css/style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current : '0',
      previous : [],
      isReset: false
    }
  };

  reset = () => {
    this.setState({current: '0', previous: [], isReset: false})
  }

  addToCurrent = (symbol) => {
    let {current, previous, isReset} = this.state;

    if(['+', '-', '*', '/'].indexOf(symbol) > -1){
      previous.push(current + symbol);
      this.setState({
        current,
        previous, 
        isReset: true
      });
    }
    else {
      if((current === '0' && symbol !== '.') || isReset){
        this.setState({
          current: symbol,
          isReset: false
        })
      }else{
        this.setState({
          current: current + symbol
        })
      }
    }
  }

  showResult = (symbol) => {
    let {current, previous, isReset} = this.state;
    if(previous.length > 0){
      current = eval(String(previous[previous.length - 1] + current));
      this.setState({
        current,
        previous: [],
        isReset: true
      })
    }
  }

  render(){
    const buttons = [
      {symbol: 'C', cols: 3, action: this.reset},
      {symbol: '/', cols: 1, action: this.addToCurrent},
      {symbol: '7', cols: 1, action: this.addToCurrent},
      {symbol: '8', cols: 1, action: this.addToCurrent},
      {symbol: '9', cols: 1, action: this.addToCurrent},
      {symbol: '*', cols: 1, action: this.addToCurrent},
      {symbol: '4', cols: 1, action: this.addToCurrent},
      {symbol: '5', cols: 1, action: this.addToCurrent},     
      {symbol: '6', cols: 1, action: this.addToCurrent},
      {symbol: '-', cols: 1, action: this.addToCurrent},
      {symbol: '1', cols: 1, action: this.addToCurrent},
      {symbol: '2', cols: 1, action: this.addToCurrent},
      {symbol: '3', cols: 1, action: this.addToCurrent},
      {symbol: '+', cols: 1, action: this.addToCurrent},
      {symbol: '0', cols: 2, action: this.addToCurrent},
      {symbol: '.', cols: 1, action: this.addToCurrent},
      {symbol: '=', cols: 1, action: this.showResult},
    ]

      let {previous} = this.state;

    return (
      <div className="App">

        {
          this.state.previous.length > 0
          ? <div className='floaty-last'>{previous[previous.length - 1]}</div>
          : null
        }

        <input className="result" type='text' value={this.state.current} />

        {
          buttons.map((btn, i) => {
            return <Button key={i} symbol={btn.symbol} col={btn.cols} action={(symbol) => btn.action(symbol)} />
          })
        }
      </div>
    )
  }
}

export default App;
