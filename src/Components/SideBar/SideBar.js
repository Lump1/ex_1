export function SideBar(props) {
    return(
       <aside>
          {props.text}
          {props.children}
        </aside>
    );
  }