import Ionicons from "@expo/vector-icons/Ionicons";
import { usePollz } from "pollz-react";
import React from "react";
import { theme } from "../../themes/base";
import { ActivityIndicator } from "../activity-indicator";
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
  const { theme: overrideTheme } = usePollz();

  return (
    <AddOptionContainer>
      <AddOptionInput
        placeholder="Add a new option"
        placeholderTextColor={"#888"}
        value={newOption}
        onChangeText={(text) => setNewOption(text)}
      />
      {addingOption ? (
        <ActivityIndicator size={30} />
      ) : (
        <AddOptionButton disabled={!newOption.trim()} onPress={handleAddOption}>
          <Ionicons
            name="add"
            size={30}
            color={overrideTheme?.colors.primary || theme.colors.primary}
          />
        </AddOptionButton>
      )}
    </AddOptionContainer>
  );
};

export default NewOption;
