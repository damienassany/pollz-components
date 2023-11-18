export type Theme = {
  colors: {
    primary: string;
    secondary: string;
  } & Record<string, string>;
  fontSizes: {
    small: string;
    medium: string;
    large: string;
  };
  fontFamily: string;
};
