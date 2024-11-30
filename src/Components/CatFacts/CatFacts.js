import { Menu } from "../Menu/Menu";
import { useState, useEffect } from "react";

function useCatFacts(number) {
    const [data, setData] = useState([]);
    const [numberState, setNumber] = useState(number);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=' + numberState);
          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных'); 
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
      <Menu lists={data}></Menu>
    );
  }