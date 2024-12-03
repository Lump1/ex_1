import './App.css';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { Header, Content, Footer, Menu, SideBar, CatFacts, DateTime, Logo, ImageGallery } from './Components';

function App() {
  return (
    <Provider store={store}>
        <div className="App">
        <Header text="Header">
          
        </Header>
        <div className='flexable column help-container'>
          <div className='flexable main-container'> 
            <SideBar text="SideBar">
                <Menu />
            </SideBar>
            <Content text="Content">
                <CatFacts number={5}></CatFacts>
                <ImageGallery></ImageGallery>
            </Content>
          </div>
          <Footer text="Footer">
            <Menu class="flexable " />
          </Footer>
          </div>
        </div>
      </Provider>
  );
}

export default App;
