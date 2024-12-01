import { urlWorker, idEnumerator } from "../../helpers";
import { useSelector } from "react-redux";

function renderList(element) {
    var target = urlWorker.urlEqualChecker(element.url, window.location.href) == true 
        ? "_self" 
        : "_blank";

    return element.url != null 
        ? <a href={element.url} target={target} rel="noopener noreferrer">{element.text}</a> 
        : <span>{element.text}</span>;
} 

export function Menu(props) {
    const menuArray = useSelector((state) => state.menu.menuArray);

    return(
       <ul className={props.class}>{menuArray.map(liElement => <li id={idEnumerator.tagEnumerate()}>{renderList(liElement)}</li>)}</ul>
    );
}