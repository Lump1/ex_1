import { DateTime } from "../DateTime/DateTime"
import { Logo } from "../Logo/Logo"
import { useSelector, Provider } from 'react-redux';
import store from '../../redux/store';

export function Header(props) {
    return (
        <header>
          {props.text}
          <Provider store={store}>
            <Logo className="left" imageUrl={useSelector(state => state.logo).logoUrl} />
          </Provider>
          

          {props.children}

          <DateTime>
          </DateTime>
        </header>
    )
}