import logo from './logo.svg';
import './App.css';
import { Header, Content, Footer, Menu, SideBar, CatFacts, DateTime, Logo } from './Components';

function App() {
  return (
    <div className="App">
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

    </div>
  );
}

export default App;
