import React from 'react';
class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suma: 0,
      resta: 0,
      multi: 0,
      div: 0,
      num1: 0,
      num2: 0
    };
    this.handlenum1Change = this.handlenum1Change.bind(this);
    this.handlenum2Change = this.handlenum2Change.bind(this);
  }

  handlenum1Change (evt) {
    this.setState({ num1: parseInt(evt.target.value) });
    console.log(typeof evt.target.value);
  }

  handlenum2Change(evt) {
    this.setState({ num2: parseInt(evt.target.value) });
    console.log(typeof evt.target.value);
  }

  addAction =(e)=> {
    let suma = this.state.num1 + this.state.num2
    this.setState({suma: suma })
     
    let resta = this.state.num1 - this.state.num2
    this.setState({resta: resta })

    let multi = this.state.num1 * this.state.num2
    this.setState({multi: multi })

    let div = this.state.num1 / this.state.num2
    this.setState({div: div })
 }


render() {
  return (
       <form>
          <br/>
          <input type="number" name="num1" onChange={this.handlenum1Change}/>
          <input type="number" name="num2" onChange={this.handlenum2Change}/>

          <input type="button" onClick={this.addAction} value="resultados"/>
          <br/>
          
          <p>Sumados dan:</p>
          <input type='text' value={this.state.suma} readOnly/>
         
          <p>Restados dan:</p>
          <input type='text' value={this.state.resta} readOnly/>

          <p>Multiplicados  dan:</p>
          <input type='text' value={this.state.multi} readOnly/>

          <p>Divididos dan:</p>
          <input type='text' value={this.state.div} readOnly/>
        </form>
     );
  }
}

export default Grade;
