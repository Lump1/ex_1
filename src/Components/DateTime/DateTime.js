import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateTime } from '../../redux/slices/clockSlice';

function CurrentDate(props) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "2-digit",
    };

    const formattedDate = props.date.toLocaleDateString("uk-UA", options);

    return <div>{formattedDate}</div>;
}

function CurrentTime(props) {
    const formattedTime = props.date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return <div>{formattedTime}</div>;
}

export function DateTime(props) {
  // const [dateState, setDate] = useState(new Date());
  const dispatch = useDispatch(); 
  
    useEffect(() => {
        const effectInterval = setInterval(() => {
            dispatch(updateTime());
        }, 1000);

        return () => {
            clearInterval(effectInterval);
        }
    }, [dispatch]);

    return (
      <div className="flexable right datetime-container">
        <CurrentDate date={useSelector(state => state.clock.currentTime)}></CurrentDate>
        <CurrentTime date={useSelector(state => state.clock.currentTime)}></CurrentTime>
      </div>
    );
}
