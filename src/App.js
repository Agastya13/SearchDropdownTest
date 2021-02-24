import React, { Component } from 'react';

export class App extends Component {
  state={
    keyword: '',
    suggestions: []
  }
  handleChange=async (e)=>{
    this.setState({keyword: e.target.value})
    // console.log(this.state.keyword);
    try{

      const suggestions =await getSuggestions(this.state.keyword)
      // console.log(suggestions);
      this.setState({suggestions})
    }
    catch(er){
      console.log('No results found!');
    }
    // console.log(this.state.suggestions);
  }

  render() {
    return (
      <div>
        <form>
              <label htmlFor="name">Search here: </label>
              <input type='text' list="names" value={this.state.keyword} onChange={this.handleChange}/>
              <datalist id="names">
                {this.state.suggestions.map(
                  (n,i)=>
                  <option key={i} value={n}/>
                )}
              </datalist>
              {/* <input type="submit"/> */}
        </form>
       </div>
    )
  }
}

export default App


//Create an input box where users can type their search.
//Display suggestions in a drop down. Suggestions should be fetched and displayed while typing
//The input for the getSuggestion API will be the current word that is being typed not the whole search. The output for the getSuggestion API will be only for the current word.
//getSuggestions API returns a promise which can get resolved or rejected at any time ranging from 0 - 200 ms.


function getRandomBool(n) {
  var maxRandomCoeff = 1000;
  if (n > maxRandomCoeff) n = maxRandomCoeff;
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}


var FAILURE_COEFF = 10;
var MAX_SERVER_LATENCY = 200;

function getSuggestions(text) {
  var pre = 'pre';
  var post = 'post';
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  
if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COEFF)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}