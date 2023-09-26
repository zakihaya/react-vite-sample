import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Person } from "@/types/Person";
const PersonsComponent = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  const fetchPersons = () => {
    // データはここから取ってくる https://www.umayadia.com/Note/Note028WebAPISample.htm#A5_2
    return fetch("https://umayadia-apisample.azurewebsites.net/api/persons")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const personsData: Person[] = [];
          // 取得したデータにIDを付与してstateに格納
          data.data.forEach((person: Omit<Person, "id">) => {
            personsData.push({
              id: uuidv4(),
              ...person,
            });
          });
          setPersons(personsData);
        }
      });
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <>
      <div>persons</div>
      <div>
        {persons.map((person) => (
          <div key={person.id}>
            {person.id}
            &nbsp;|&nbsp;
            {person.name}
            &nbsp;|&nbsp;
            {person.note}
            &nbsp;|&nbsp;
            {person.age}
            &nbsp;|&nbsp;
            {person.registerDate}
          </div>
        ))}
      </div>
    </>
  );
};

export default PersonsComponent;
