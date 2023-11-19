import React from "react";
import { ActivityIndicator } from "../../../_components/activity-indicator";
import { VoteButton, VoteText } from "../styles";
import { Row } from "./styles";

type Props = {
  handleVote: () => Promise<void>;
  selectedOption: number | null;
  loading: boolean;
  confirmText: string;
};

export const Footer: React.FC<Props> = ({
  handleVote,
  selectedOption,
  loading,
  confirmText,
}) => {
  return (
    <VoteButton onPress={handleVote} disabled={!selectedOption || loading}>
      <Row>
        <VoteText>{confirmText}</VoteText>
        {loading && <ActivityIndicator color={"white"} size={"small"} />}
      </Row>
    </VoteButton>
  );
};
