import React from "react";
import { ActivityIndicator } from "../../_components/activity-indicator";
import { Footer } from "./components/footer";
import { Greetings } from "./components/greetings";
import { NewOption } from "./components/new-option";
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
  canAddOptions?: boolean;
};

export const Poll: React.FC<Props> = ({
  pollId,
  onSubmitted,
  userId,
  confirmToVote = true,
  withoutFeedback = false,
  confirmText = "Vote",
  greetingsText = "Thanks for voting!",
  canAddOptions = false,
}) => {
  const {
    poll,
    selectedOption,
    handleSelectOption,
    loading,
    voted,
    handleVote,
    handleAddOption,
    newOption,
    setNewOption,
    addingOption,
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
          {canAddOptions && (
            <NewOption
              newOption={newOption}
              setNewOption={setNewOption}
              addingOption={addingOption}
              handleAddOption={handleAddOption}
            />
          )}
          {poll.options.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              selectedOptionId={selectedOption}
              handleSelectOption={handleSelectOption}
            />
          ))}

          {confirmToVote ? (
            <Footer
              handleVote={() => handleVote()}
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
