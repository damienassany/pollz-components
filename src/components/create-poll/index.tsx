import React, { useCallback, useMemo, useState } from "react";

import { Poll, PollTypes } from "pollz-js";
import { usePollz } from "pollz-react";
import { FlatList, Switch } from "react-native";
import { FadeInUp } from "react-native-reanimated";
import { ActivityIndicator } from "../../_components/activity-indicator";
import {
  BorderedInputField,
  CheckboxContainer,
  CheckboxLabel,
  Container,
  CreateButton,
  CreateButtonText,
  InputField,
  InputLabel,
  OptionWrapper,
  listStyles,
} from "./styles";

type Props = {
  onPollCreated?: (poll: Poll) => void;
};

export const CreatePoll: React.FC<Props> = ({ onPollCreated }) => {
  const { sdk } = usePollz();
  const [pollName, setPollName] = useState("");
  const [options, setOptions] = useState(["", ""]); // Initial state with one empty option
  const [pollTypeId, setPollTypeId] = useState(PollTypes.SingleChoice); // Initial state with one empty option
  const [creatingPoll, setCreatingPoll] = useState(false);

  const isValid = useMemo(() => {
    return (
      pollName.trim() !== "" &&
      options.filter((option) => option.trim() !== "").length > 1 &&
      options.every(
        (option) => options.filter((o) => o === option).length === 1
      )
    );
  }, [options, pollName]);

  const addNewOption = useCallback(() => {
    setOptions((prev) => [...prev, ""]);
  }, []);

  const handleOptionChange = useCallback((index: number, value: string) => {
    setOptions((options) => {
      const updatedOptions = [...options];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  }, []);

  const resetPoll = useCallback(() => {
    setPollName("");
    setOptions(["", ""]);
    setPollTypeId(PollTypes.SingleChoice);
  }, []);

  const handleCreatePoll = useCallback(async () => {
    if (!isValid) {
      return;
    }

    try {
      setCreatingPoll(true);
      // Filter out empty options before creating the poll
      const nonEmptyOptions = options.filter((option) => option.trim() !== "");

      if (nonEmptyOptions.length < 2) {
        return;
      }

      const poll = await sdk.create({
        name: pollName,
        options: nonEmptyOptions,
        pollTypeId,
      });

      resetPoll();

      onPollCreated?.(poll);

      // Optionally, you can redirect or do something after poll creation
    } catch (error) {
      console.error("Error creating poll:", error);
    } finally {
      setCreatingPoll(false);
    }
  }, [options, pollName, pollTypeId, resetPoll, sdk, isValid, onPollCreated]);

  const handleRemoveOption = useCallback((index: number) => {
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);

      return updatedOptions;
    });
  }, []);

  const handleInput = useCallback(
    (text: string, index: number): void => {
      if (text.trim() === "" && options.length > 2) {
        handleRemoveOption(index);
        return;
      }

      if (
        text.trim().length > 0 &&
        options.filter((option) => option.trim() === "").length === 0
      ) {
        addNewOption();
      }

      handleOptionChange(index, text);
    },
    [addNewOption, handleOptionChange, handleRemoveOption, options]
  );

  return (
    <Container>
      <InputLabel>Create a Poll</InputLabel>
      <BorderedInputField
        placeholderTextColor={"#888"}
        placeholder="Ask your question"
        value={pollName}
        onChangeText={(text) => setPollName(text)}
      />

      <CheckboxContainer>
        <Switch
          // @ts-ignore
          activeThumbColor={"white"}
          thumbColor={"white"}
          trackColor={{ false: "#ecddfe", true: "#8133ca" }}
          value={pollTypeId === PollTypes.MultipleChoice}
          onValueChange={(value) =>
            setPollTypeId(
              value ? PollTypes.MultipleChoice : PollTypes.SingleChoice
            )
          }
        />
        <CheckboxLabel>Allow multiple responses</CheckboxLabel>
      </CheckboxContainer>

      <FlatList
        scrollEnabled={false}
        contentContainerStyle={listStyles}
        data={options}
        renderItem={({ item, index }) => {
          return (
            <OptionWrapper
              isError={
                item.trim() !== "" &&
                options.filter((option) => option === item).length > 1
              }
              isFirst={index === 0}
              isLast={index === options.length - 1}
              entering={FadeInUp}
            >
              <InputField
                placeholderTextColor={"#888"}
                placeholder={"New option"}
                value={item}
                onChangeText={(text) => handleInput(text, index)}
              />
            </OptionWrapper>
          );
        }}
      />

      <CreateButton disabled={!isValid} onPress={handleCreatePoll}>
        <CreateButtonText>Confirm</CreateButtonText>
        {creatingPoll && <ActivityIndicator size={"small"} color={"white"} />}
      </CreateButton>
    </Container>
  );
};
