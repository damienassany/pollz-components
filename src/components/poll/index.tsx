import React from "react";
import { ActivityIndicator } from "../../_components/activity-indicator";
import { Footer } from "./components/footer";
import { Greetings } from "./components/greetings";
import { OptionRow } from "./components/option-row";
import { hook } from "./hook";
import { NoPollWrapper, PollName, Wrapper } from "./styles";

type Props = {
  pollId: number;
  onSubmitted?: (poll: any) => void;
  userId: string;
  confirmToVote?: boolean;
  withoutFeedback?: boolean;
  confirmText?: string;
  greetingsText?: string;
};

export const Poll: React.FC<Props> = ({
  pollId,
  onSubmitted,
  userId,
  confirmToVote = true,
  withoutFeedback = false,
  confirmText = "Vote",
  greetingsText = "Thanks for voting!",
}) => {
  const {
    poll,
    selectedOption,
    setSelectedOption,
    loading,
    voted,
    handleVote,
  } = hook(pollId, userId, confirmToVote, withoutFeedback, onSubmitted);

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

      {voted ? (
        <Greetings greetingsText={greetingsText} />
      ) : (
        <>
          {poll.options.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              selectedOptionId={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ))}

          {confirmToVote ? (
            <Footer
              handleVote={handleVote}
              selectedOption={selectedOption}
              loading={loading}
              confirmText={confirmText}
            />
          ) : null}
        </>
      )}
    </Wrapper>
  );
};
