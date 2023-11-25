import styled from "@emotion/native";
import Animated from "react-native-reanimated";
import { Text, TextSemiBold } from "../../_components/text";
import { theme } from "../../themes/base";

export const Container = styled.View`
  padding: 16px;
  border-width: 1px;
  border-radius: 8px;
  border-color: #ddd;
  margin-bottom: 16px;
  background-color: white;
  gap: 16px;
  width: 100%;
`;
export const InputLabel = styled(TextSemiBold)`
  font-size: 16px;
  font-weight: bold;
`;

export const InputField = styled.TextInput`
  height: 40px;
  padding: 8px;
  flex-grow: 1;
  font-family: Outfit_400Regular;
`;

export const CreateButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

export const CreateButtonText = styled(Text)`
  color: white;
  font-size: 16px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxLabel = styled(Text)`
  font-size: 14px;
  margin-left: 8px;
`;

export const BorderedInputField = styled(InputField)`
  border-color: #aaa;
  border-width: 1px;
  border-radius: 5px;
`;

export const listStyles = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "#aaa",
};

export const OptionWrapper = styled(Animated.View)<{
  isFirst: boolean;
  isLast: boolean;
  isError: boolean;
}>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: ${({ isLast }) => (isLast ? "0px" : "1px")};
  border-color: #aaa;
  background-color: ${({ isError }) => (isError ? "#fdd" : "transparent")};
  border-radius: ${({ isFirst, isLast }) =>
    isFirst ? "4px 4px 0px 0px" : isLast ? "0px 0px 5px 5px" : "0px"};
`;
