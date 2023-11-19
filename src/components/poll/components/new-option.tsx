import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ActivityIndicator } from "../../../_components/activity-indicator";
import { theme } from "../../../themes/base";
import { AddOptionButton, AddOptionContainer, AddOptionInput } from "./styles";

type Props = {
  newOption: string;
  setNewOption: React.Dispatch<React.SetStateAction<string>>;
  addingOption: boolean;
  handleAddOption: () => void;
};

export const NewOption: React.FC<Props> = ({
  newOption,
  setNewOption,
  addingOption,
  handleAddOption,
}) => {
  return (
    <AddOptionContainer>
      <AddOptionInput
        placeholder="Add a new option"
        value={newOption}
        onChangeText={(text) => setNewOption(text)}
      />
      {addingOption ? (
        <ActivityIndicator size={30} />
      ) : (
        <AddOptionButton onPress={handleAddOption}>
          <Ionicons name="add" size={30} color={theme.colors.primary} />
        </AddOptionButton>
      )}
    </AddOptionContainer>
  );
};

export default NewOption;
