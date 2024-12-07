import { Provider } from 'react-redux';
import store from '../../redux/store';

export function Footer(props) {
    return(
        <footer>
            {props.children}
            {props.text}
        </footer>
    );
  }