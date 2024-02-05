# pollz-components

A collection of React Native components designed for both mobile and web platforms. Easily create and interact with polls in your React Native applications.

## Installation

Install the package using npm or yarn:

```bash
npm install pollz-components
# or
yarn add pollz-components
```

### Poll Component

Use the `PollComponent` to display and interact with polls in your React Native application.

```jsx
import React from "react";
import { View, Text } from "react-native";
import { Poll } from "pollz-components";

const MyPollPage = () => {
  return (
    <View>
      <Text>Poll Example</Text>
      <Poll pollId="your-poll-id" userId="your-user-id" />
    </View>
  );
};

export default MyPollPage;
```

### Create Poll Component

Integrate the `CreatePoll` to allow users to create new polls.

```jsx
import React from "react";
import { View, Text } from "react-native";
import { CreatePoll } from "pollz-components";

const CreatePollPage = () => {
  return (
    <View>
      <Text>Create Poll Example</Text>
      <CreatePoll />
    </View>
  );
};

export default CreatePollPage;
```

## License

This project is licensed under the MIT License.
