import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_str: "",
      receive_area: Object(),
      name: "",
      message: "没有输入信息。",
    };
    this.get_data = this.get_data.bind(this);
  }


  message_change = (event) => {
    this.setState({message: event.target.value});
  }
  name_change = (event) => {
    this.setState({name: event.target.value});
  }

  send_message = () => {
    fetch('https://still-shore-64819.herokuapp.com/send', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        message: this.state.message,
      })
    }).then(response => response.json())
  }
  componentDidMount() {
    setInterval(this.get_data, 2000);
  }
  async get_data(data){
    fetch('https://still-shore-64819.herokuapp.com/read')
    .then(response => response.json())
    .then(data => {
      this.state.receive_area = document.getElementById('receive_area');
      this.state.data_str = "";
      for (var i = 0; i < data.length; i++) {
        this.state.data_str = this.state.data_str + '<' + data[i]['name'] + '>' + data[i]['message'] + '\n';
      }
      this.state.receive_area.value = this.state.data_str;
    })

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the chat!</h1>
          聊天名字 Your Name: 
          <input name="name" type="text" 
                 onChange={this.name_change}/> <br />
          在这里输入信息:
          <textarea className="message" 
                    cols="20" name="message" 
                    rows="5"
                    placeholder="在这里输入信息吧！Enter your message!"
                    onChange={this.message_change}></textarea><br />
          <input className="messagebutton" 
                 type="button" 
                 value="send message"
                 onClick={this.send_message}/>
          <textarea className="read" 
                    id="receive_area"
                    cols="50" name="received" 
                    rows="13"
                    placeholder="Here are received messages:"></textarea> <br />
        </header>
      </div>
    );
  }
}

export default App;
