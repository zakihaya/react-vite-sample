import React, { ReactNode, createContext, useContext, useState } from "react";

const teamIdContext = createContext<{
  teamId: string;
  refreshTeamId: () => void;
} | null>(null);

const newTeamId = () => {
  return String(new Date().getTime());
};

type providerProps = {
  children: ReactNode;
};

const TeamIdProvider = ({ children }: providerProps) => {
  const [teamId, setTeamId] = useState<string>(newTeamId());

  const refreshTeamId = () => {
    const teamId = newTeamId();
    setTeamId(teamId);
  };

  return React.createElement(
    teamIdContext.Provider,
    { value: { teamId, refreshTeamId } },
    children
  );
};

const useTeamId = () => {
  const context = useContext(teamIdContext);
  if (context === null) {
    throw new Error("use teamId only inside of <TeamIdProvider>");
  }

  return context.teamId;
};

const useRefreshTeamId = () => {
  const context = useContext(teamIdContext);
  if (context === null) {
    throw new Error("use teamId only inside of <TeamIdProvider>");
  }

  return context.refreshTeamId;
};

export { TeamIdProvider, useTeamId, useRefreshTeamId };
