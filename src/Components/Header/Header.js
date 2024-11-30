import { DateTime } from "../DateTime/DateTime"
import { Logo } from "../Logo/Logo"

export function Header(props) {
    return (
        <header>
          {props.text}
          <Logo className="left" imageUrl={props.imgUrl} />
          <DateTime>
            <DateTime.CurrentDate />
            <DateTime.CurrentTime />
          </DateTime>
        </header>
    )
}