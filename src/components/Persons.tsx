import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import PersonFormComponent from "@/components/PersonForm";
import type { Person } from "@/types/Person";

const PersonsComponent = () => {
  const fetchPersonsWithTanstack = async () => {
    const result = await axios.get<{
      success: boolean;
      data: Person[];
    }>("https://umayadia-apisample.azurewebsites.net/api/persons");
    return result.data;
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["persons"],
    queryFn: fetchPersonsWithTanstack,
  });

  const createPerson = async (newPerson: Person) => {
    const result = await axios.post(
      "https://umayadia-apisample.azurewebsites.net/api/persons",
      newPerson
    );
    return result.data;
  };

  const addMutation = useMutation({
    mutationFn: createPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
  });

  const onSubmit = (name: string, note: string, age: number | null) => {
    addMutation.mutate({
      name: name,
      note: note,
      age: age,
      registerDate: new Date().toISOString(),
    });
  };

  return (
    <>
      <div>persons by Tanstack</div>
      {isLoading && <div>Loading...</div>}
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
      <hr />
      <PersonFormComponent onSubmit={onSubmit} />
    </>
  );
};

export default PersonsComponent;
