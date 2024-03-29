import { PollTypes } from "pollz-js";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "../../commons/activity-indicator";
import { NewOption } from "../../commons/new-option";
import { Footer } from "./components/footer";
import { Greetings } from "./components/greetings";
import { OptionButton } from "./components/option-button";
import { OptionRow } from "./components/option-row";
import { Row } from "./components/styles";
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
    selectedOptionIds,
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
            <View style={{ marginBottom: 8 }}>
              <NewOption
                newOption={newOption}
                setNewOption={setNewOption}
                addingOption={addingOption}
                handleAddOption={handleAddOption}
              />
            </View>
          )}

          {poll.pollType.id === PollTypes.Scale ? (
            <Row>
              {poll.options.map((option) => (
                <OptionButton
                  key={option.id}
                  handleSelectOption={handleSelectOption}
                  option={option}
                  selectedOptionIds={selectedOptionIds}
                />
              ))}
            </Row>
          ) : (
            <>
              {poll.options.map((option) => (
                <OptionRow
                  pollTypeId={poll.pollType.id}
                  key={option.id}
                  option={option}
                  selectedOptionIds={selectedOptionIds}
                  handleSelectOption={handleSelectOption}
                />
              ))}
            </>
          )}

          {confirmToVote ? (
            <Footer
              handleVote={() => handleVote()}
              selectedOptionIds={selectedOptionIds}
              loading={loading}
              confirmText={confirmText}
            />
          ) : null}
        </>
      )}
    </Wrapper>
  );
};
