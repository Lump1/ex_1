export function Footer(props) {
    return(
        <footer>
            {props.text}
            {props.children}
        </footer>
    );
  }