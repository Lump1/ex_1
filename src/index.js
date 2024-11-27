import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Header extends React.Component {
  render() {
    return <header>{this.props.text}</header>;
  }
}

class Footer extends React.Component {
  render() {
    return <footer>{this.props.text}</footer>;
  }
}

class Content extends React.Component {
  render() {
    return <main>{this.props.text}</main>;
  }
}

class SideBar extends React.Component {
  render() {
    return <aside>{this.props.text}</aside>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header text="Header" />
    <div className='flexable column help-container'>
      <div className='flexable main-container'> 
        <SideBar text="SideBar" />
        <Content text="Content" />
      </div>
      <Footer text="Footer" />
    </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
