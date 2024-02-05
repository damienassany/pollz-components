import { usePollz } from "pollz-react";
import React from "react";
import { ActivityIndicator } from "../../../commons/activity-indicator";
import { VoteButton, VoteText } from "../styles";
import { Row } from "./styles";

type Props = {
  handleVote: () => Promise<void>;
  selectedOptionIds: number[];
  loading: boolean;
  confirmText: string;
};

export const Footer: React.FC<Props> = ({
  handleVote,
  selectedOptionIds,
  loading,
  confirmText,
}) => {
  const { theme: overrideTheme } = usePollz();

  return (
    <VoteButton
      color={overrideTheme?.colors.primary}
      onPress={handleVote}
      disabled={!selectedOptionIds.length || loading}
    >
      <Row>
        <VoteText>{confirmText}</VoteText>
        {loading && <ActivityIndicator color={"white"} size={"small"} />}
      </Row>
    </VoteButton>
  );
};
