import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import idEnumerator from './helpers'

const findByType = (children, component) => {
  const result = [];
  
  React.Children.forEach(children, (child) => {
    if (child && child.type === component) {
      result.push(child);
    }
  });

  return result[0];
};

class urlWorker {
  static urlCutter(url) {
    if(url == undefined) return undefined;

    var start = url.indexOf("//") == -1 ? 0 : url.indexOf("//") + 2;
    var end = url.indexOf("/", start) == -1 ? url.length : url.indexOf("/", start);

    url = url.slice(start, end);

    return url;
  }

  static urlEqualChecker(url1, url2) {
    if(this.urlCutter(url1) === this.urlCutter(url2)) return true;
    else return false;
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        {this.props.text}
        <Logo className="left" imageUrl={this.props.imgUrl} />
        <DateTime>
          <DateTime.CurrentDate />
          <DateTime.CurrentTime />
        </DateTime>
      </header>
    );
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
      <CatFactsWrapper number={5}></CatFactsWrapper>
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

  renderList(element) {
    var target = urlWorker.urlEqualChecker(element.url, window.location.href) == true ? "_self" : "_blank";
    console.log(element.url);
    console.log(target);

    return element.url != null ? <a href={element.url} target={target} rel="noopener noreferrer">{element.text}</a> : <span>{element.text}</span>;
  } 

  render() {
    return <ul className={this.props.class}>{this.props.lists.map(liElement => <li id={idEnumerator.tagEnumerate("aside")}>{this.renderList(liElement)}</li>)}</ul>;
  }
}

class Logo extends React.Component {
  render() {
    return <a className={this.props.class} target="_self" href={window.location.protocol + "//" + urlWorker.urlCutter(window.location.href)}><img src={this.props.imageUrl} /></a>
  }
}

const CurrentDate = () => null;
const CurrentTime = () => null;

class DateTime extends React.Component {
  dateTimeObj = new Date();

  renderCurrentDate() {
    const { children } = this.props;
    const dateComponent = findByType(children, CurrentDate);

    if (!dateComponent) {
      return null;
    }

    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "2-digit",
    };

    const formattedDate = this.dateTimeObj.toLocaleDateString("uk-UA", options);

    return <div>{formattedDate}</div>;
  }

  renderCurrentTime() {
    const { children } = this.props;
    const timeComponent = findByType(children, CurrentTime);

    if (!timeComponent) {
      return null;
    }

    const formattedTime = this.dateTimeObj.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return <div>{formattedTime}</div>;
  }

  render() {
    return (
      <div className="flexable right datetime-container">
        {this.renderCurrentDate()}
        {this.renderCurrentTime()}
      </div>
    );
  }
}

function useCatFacts(number) {
  const [data, setData] = useState([]);
  const [numberState, setNumber] = useState(number);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=' + numberState);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных'); 
        }
        const result = await response.json();
        setData(result); 

      } catch (err) {
        console.error("Something went wrong with data extraction: " + err);
      }
    }

    fetchData();
  }, []);

  return data;
}

function CatFactsWrapper({ number }) {
  const data = useCatFacts(number);

  return (
    <Menu lists={data}></Menu>
  );
}

DateTime.CurrentDate = CurrentDate;
DateTime.CurrentTime = CurrentTime;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <article>
    <Header text="Header" imgUrl="/images/ff26efc7cf45a17a3622d0add92b15d5.jpg">
    </Header>
    <div className='flexable column help-container'>
      <div className='flexable main-container'> 
        <SideBar text="SideBar" lists={[{text: "someText1"}, {text: "someText2", url: "https://music.youtube.com/watch?v=y88PeNOXS9I&si=CZWXtxhoeOINhLCG"}, {text: "someText3", url: `${window.location.href}documentation`}]} />
        <Content text="Content">

        </Content>
      </div>
      <Footer text="Footer" lists={[{text: "someText1"}, {text: "someText2", url: "https://music.youtube.com/watch?v=y88PeNOXS9I&si=CZWXtxhoeOINhLCG"}, {text: "someText3", url: `${window.location.href}documentation`}]}/>
    </div>

  </article>
);

reportWebVitals();
