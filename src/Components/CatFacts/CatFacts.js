import { Menu } from "../Menu/Menu";
import { useState, useEffect } from "react";
import { idEnumerator } from "../../helpers";

function useCatFacts(number) {
    const [data, setData] = useState([]);
    const [numberState, setNumber] = useState(number);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=' + number, {
            headers: {
              'X-RapidAPI-Key': 'live_KFuc0KkkqQax4aqmTkVndipWzYrbA6mp8zMBHK7TtzBTvChQ7uIgbSs6GbhyaBQY',
			        'X-RapidAPI-Host': 'https://api.thecatapi.com/',
            }
          });
          if (!response.ok) {
            throw new Error('Something went wrong!'); 
          }
          const result = await response.json();
          setData(result); 
  
        } catch (err) {
          console.error("Something went wrong with data extraction: " + err);
        }
      }
  
      fetchData();
    }, []);
  
    return data;
  }
  
  export function CatFacts({ number }) {
    const data = useCatFacts(number);
  
    return (
      // <ul>{data.map(liElement => <li id={idEnumerator.tagEnumerate()}>{liElement["text"]}</li>)}</ul>
      <div className="images-container">
        {
          data.map(liElement => <img className="cat-api-img" id={idEnumerator.tagEnumerate()} src={liElement["url"]}></img>)
        }
      </div>
    );
  }