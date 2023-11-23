import React, { useState } from "react";

import { PollTypes } from "pollz-js";
import { usePollz } from "pollz-react";
import { FlatList, Switch } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  CheckboxContainer,
  CheckboxLabel,
  Container,
  CreateButton,
  CreateButtonText,
  InputField,
  InputLabel,
} from "./styles";

type Props = {};

const listStyles = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "#aaa",
};

// TODO: add memoization

export const CreatePoll: React.FC<Props> = () => {
  const { sdk } = usePollz();
  const [pollName, setPollName] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]); // Initial state with one empty option
  const [pollTypeId, setPollTypeId] = useState<number>(PollTypes.SingleChoice); // Initial state with one empty option

  const addNewOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    setOptions((options) => {
      const updatedOptions = [...options];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const resetPoll = () => {
    setPollName("");
    setOptions(["", ""]);
    setPollTypeId(PollTypes.SingleChoice);
  };

  const handleCreatePoll = async () => {
    try {
      // Filter out empty options before creating the poll
      const nonEmptyOptions = options.filter((option) => option.trim() !== "");

      if (nonEmptyOptions.length < 2) {
        return;
      }

      // TODO: add loading state

      await sdk.create({
        name: pollName,
        options: nonEmptyOptions,
        pollTypeId,
      });

      resetPoll();

      // Optionally, you can redirect or do something after poll creation
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleInput = (text: string, index: number): void => {
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
  };

  return (
    <Container>
      <InputLabel>Create a Poll</InputLabel>
      <InputField
        style={{ borderColor: "#aaa", borderWidth: 1, borderRadius: 5 }}
        placeholderTextColor={"#888"}
        placeholder="Ask your question"
        value={pollName}
        onChangeText={(text) => setPollName(text)}
      />

      <CheckboxContainer>
        <Switch
          // @ts-ignore
          activeThumbColor={"#ecddfe"}
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
          // TODO: export styles
          return (
            <Animated.View
              entering={FadeInUp}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: index < options.length - 1 ? 1 : 0,
                borderColor: "#aaa",
              }}
            >
              <InputField
                placeholderTextColor={"#888"}
                placeholder={`New option`}
                value={item}
                onChangeText={(text) => handleInput(text, index)}
              />
            </Animated.View>
          );
        }}
      />

      <CreateButton onPress={handleCreatePoll}>
        <CreateButtonText>Confirm</CreateButtonText>
      </CreateButton>
    </Container>
  );
};
