import { usePoll, usePollz } from "pollz-react";
import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import {
  NoPollWrapper,
  OptionLabel,
  OptionWrapper,
  PollName,
  Tick,
  VoteButton,
  VoteText,
  Wrapper,
} from "./styles";

type Props = {
  pollId: number;
  onSubmitted?: (poll: any) => void;
  userId: string;
};

export const Poll: React.FC<Props> = ({ pollId, onSubmitted, userId }) => {
  const { sdk } = usePollz();
  const { poll } = usePoll(pollId, { listen: true });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    if (!poll || !selectedOption) {
      return;
    }

    try {
      setLoading(true);
      const votedPoll = await sdk.vote(
        pollId,
        selectedOption,
        userId,
        poll.pollType.id
      );
      setLoading(false);

      if (onSubmitted) {
        onSubmitted(votedPoll);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      setLoading(false);
    }
  };

  if (!poll) {
    return (
      <NoPollWrapper>
        <ActivityIndicator size={"large"} />
      </NoPollWrapper>
    );
  }

  return (
    <Wrapper>
      <PollName>{poll.name}</PollName>
      {poll.options.map((option) => (
        <OptionWrapper key={option.id}>
          <TouchableOpacity
            style={[
              {
                width: 20,
                height: 20,
                marginRight: 8,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#aaa",
                justifyContent: "center",
                alignItems: "center",
              },
              selectedOption === option.id && { backgroundColor: "#3498db" },
            ]}
            onPress={() => setSelectedOption(option.id)}
          >
            {selectedOption === option.id && <Tick />}
          </TouchableOpacity>
          <OptionLabel>{option.label}</OptionLabel>
        </OptionWrapper>
      ))}
      <VoteButton onPress={handleVote} disabled={!selectedOption || loading}>
        <VoteText>
          Vote {loading && <ActivityIndicator size={"small"} />}
        </VoteText>
      </VoteButton>
    </Wrapper>
  );
};
