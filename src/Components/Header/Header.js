import { DateTime } from "../DateTime/DateTime"
import { Logo } from "../Logo/Logo"
import { useSelector, Provider } from 'react-redux';
import store from '../../redux/store';

export function Header(props) {
    return (
        <header>
          <Provider store={store}>
            <Logo class="left" imageUrl={useSelector(state => state.logo).logoUrl} />
          </Provider>
          

          {props.children}

          {props.text}

          <DateTime>
          </DateTime>
        </header>
    )
}