import styled from "@emotion/native";
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
