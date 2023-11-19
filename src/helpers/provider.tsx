import styled from "@emotion/native";
import { PollzProvider, usePollz } from "pollz-react";
import React, { PropsWithChildren } from "react";
import { ActivityIndicator } from "../_components/activity-indicator";

const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const WithPollz: React.FC<PropsWithChildren> = ({ children }) => {
  const { initialized } = usePollz();

  if (!initialized) {
    return (
      <CenteredView>
        <ActivityIndicator size={"large"} />
      </CenteredView>
    );
  }

  return children;
};

export const Provider: React.FC<PropsWithChildren> = ({ children }) => (
  <PollzProvider
    appId="9973a8b9-ca11-451a-b035-c5ad9633fb06"
    appSecret="08fRrLjhM4frjILtO8ylBInPozQ="
  >
    <CenteredView>
      <WithPollz>{children}</WithPollz>
    </CenteredView>
  </PollzProvider>
);

export const ProviderFn = (getStory: () => React.ReactNode) => (
  <Provider>{getStory()}</Provider>
);
