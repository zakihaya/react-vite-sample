import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { Person } from "@/types/Person";

const PersonsComponent = () => {
  const fetchPersonsWithTanstack = async () => {
    const result = await axios.get<{
      success: boolean;
      data: Person[];
    }>("https://umayadia-apisample.azurewebsites.net/api/persons");
    return result.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["persons"],
    queryFn: fetchPersonsWithTanstack,
  });

  return (
    <>
      <div>persons by Tanstack</div>
      {isLoading && <div>Loading...</div>}
      {data && console.log(data)}
      {data && (
        <div>
          {data.data.map((d) => (
            <div key={d.name}>
              <Link to={`/persons/${d.name}`}>{d.name}</Link>
              &nbsp;|&nbsp;
              {d.note}
              &nbsp;|&nbsp;
              {d.age}
              &nbsp;|&nbsp;
              {d.registerDate}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PersonsComponent;
