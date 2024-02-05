import styled from "@emotion/native";
import { Text } from "../../../commons/text";
import { theme } from "../../../themes/base";

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Circle = styled.TouchableOpacity<{
  active?: boolean;
  color: string | undefined;
}>`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #aaa;
  justify-content: center;
  align-items: center;
  ${({ active, color = theme.colors.primary }) =>
    active && `background-color: ${color};`}
`;

export const OptionButtonLabel = styled(Text)`
  padding: 5px;
  font-size: 18px;
`;
export const OptionButtonWrapper = styled.TouchableOpacity<{
  backgroundColor: string;
  borderColor: string;
}>`
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ borderColor }) => borderColor};
`;
