import { useState, useEffect } from "react";

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
  const [dateState, setDate] = useState(new Date());
  
    useEffect(() => {
        const effectInterval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(effectInterval);
        }
    }, []);

    return (
      <div className="flexable right datetime-container">
        <CurrentDate date={dateState}></CurrentDate>
        <CurrentTime date={dateState}></CurrentTime>
      </div>
    );
}
