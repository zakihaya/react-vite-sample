import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Person } from "@/types/Person";

const PersonComponent = () => {
  const { name } = useParams();
  const fetchPersonWithTanstack = async () => {
    const result = await axios.get<{
      success: boolean;
      data: Person;
    }>(`https://umayadia-apisample.azurewebsites.net/api/persons/${name}`);
    return result.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["person"],
    queryFn: fetchPersonWithTanstack,
  });

  return (
    <>
      <div>persons by Tanstack</div>
      {isLoading && <div>Loading...</div>}
      {data && console.log(data)}
      {data?.data && (
        <div>
          {data.data.name}
          &nbsp;|&nbsp;
          {data.data.note}
          &nbsp;|&nbsp;
          {data.data.age}
          &nbsp;|&nbsp;
          {data.data.registerDate}
        </div>
      )}
    </>
  );
};

export default PersonComponent;
