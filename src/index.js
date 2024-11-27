import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import idEnumerator from './helpers'

class Header extends React.Component {
  render() {
    return <header>{this.props.text}</header>;
  }
}

class Footer extends React.Component {
  render() {
    return <footer>
      {this.props.text}
      <Menu class="flexable" lists={this.props.lists} />
    </footer>;
  }
}

class Content extends React.Component {
  render() {
    return <main>
      {this.props.text}
    </main>;
  }
}

class SideBar extends React.Component {
  render() {
    return <aside>
        {this.props.text}
        <Menu lists={this.props.lists} />
      </aside>;
  }
}

class Menu extends React.Component {
  urlCutter(url) {
    if(url == undefined) return undefined;

    var start = url.indexOf("//") == -1 ? 0 : url.indexOf("//") + 2;
    var end = url.indexOf("/", start) == -1 ? url.length : url.indexOf("/", start);

    url = url.slice(start, end);

    return url;
  }

  urlEqualChecker(url1, url2) {
    if(this.urlCutter(url1) === this.urlCutter(url2)) return true;
    else return false;
  }
  renderList(element) {
    var target = this.urlEqualChecker(element.url, window.location.href) == true ? "_self" : "_blank";
    console.log(element.url);
    console.log(target);

    return element.url != null ? <a href={element.url} target={target} rel="noopener noreferrer">{element.text}</a> : <span>{element.text}</span>;
  } 

  render() {
    return <ul className={this.props.class}>{this.props.lists.map(liElement => <li id={idEnumerator.tagEnumerate("aside")}>{this.renderList(liElement)}</li>)}</ul>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Header text="Header" />
    <div className='flexable column help-container'>
      <div className='flexable main-container'> 
        <SideBar text="SideBar" lists={[{text: "someText1"}, {text: "someText2", url: "https://music.youtube.com/watch?v=y88PeNOXS9I&si=CZWXtxhoeOINhLCG"}, {text: "someText3", url: `${window.location.href}documentation`}]} />
        <Content text="Content" />
      </div>
      <Footer text="Footer" lists={[{text: "someText1"}, {text: "someText2", url: "https://music.youtube.com/watch?v=y88PeNOXS9I&si=CZWXtxhoeOINhLCG"}, {text: "someText3", url: `${window.location.href}documentation`}]}/>
    </div>

  </div>
);

reportWebVitals();
