import { usePollz } from "pollz-react";
import React from "react";
import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from "react-native";
import { theme } from "../../themes/base";

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = (props) => {
  const { theme: overrideTheme } = usePollz();

  return (
    <RNActivityIndicator
      color={overrideTheme?.colors.primary || theme.colors.primary}
      {...props}
    />
  );
};
