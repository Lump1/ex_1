import { urlWorker } from "../../helpers";

export function Logo(props) {
    return(
       <a className={props.class} target="_self" href={window.location.protocol + "//" + urlWorker.urlCutter(window.location.href)}><img src={props.imageUrl} /></a>
    );
  }