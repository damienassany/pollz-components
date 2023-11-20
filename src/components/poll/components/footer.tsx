import React from "react";
import { ActivityIndicator } from "../../../_components/activity-indicator";
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
  return (
    <VoteButton
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
