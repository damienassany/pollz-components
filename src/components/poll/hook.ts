import { usePoll, usePollz } from "pollz-react";
import { useEffect, useMemo, useState } from "react";

export const hook = (
  pollId: number,
  userId: string,
  confirmToVote: boolean,
  withoutFeedback: boolean,
  onSubmitted?: (poll: any) => void
) => {
  const { sdk } = usePollz();
  const { poll } = usePoll(pollId, { listen: true });
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [addingOption, setAddingOption] = useState(false);
  const [voted, setVoted] = useState(false);

  const initialSelectedOption = useMemo(() => {
    return poll?.options.find((option) =>
      option.voters.some((voter) => voter.userId === userId)
    )?.id;
  }, [poll, userId]);

  const handleVote = async (optionId = selectedOption) => {
    if (!poll || !optionId) {
      return;
    }

    try {
      setLoading(true);

      const votedPoll = await sdk.vote(
        pollId,
        optionId,
        userId,
        poll.pollType.id
      );

      setLoading(false);
      onSubmitted?.(votedPoll);

      if (!withoutFeedback) {
        setVoted(true);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      setLoading(false);
    }
  };

  const handleAddOption = () => {
    // Add your logic to add a new option
    if (newOption.trim() !== "") {
      setAddingOption(true);
      // Assuming there is a method in your SDK to add an option
      sdk
        .addOption(pollId, newOption.trim())
        .then((updatedPoll) => {
          // Assuming usePoll hook updates the poll details automatically
          // If not, you might need to refetch the poll using usePoll
          if (updatedPoll) {
            setNewOption(""); // Clear the input field after adding the option
          }
        })
        .finally(() => {
          setAddingOption(false);
        });
    }
  };

  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);

    if (!confirmToVote) {
      handleVote(optionId);
    }
  };

  useEffect(() => {
    if (initialSelectedOption) {
      setSelectedOption(initialSelectedOption);
    }
  }, [initialSelectedOption]);

  return {
    poll,
    selectedOption,
    handleSelectOption,
    loading,
    voted,
    handleVote,
    handleAddOption,
    newOption,
    setNewOption,
    addingOption,
  };
};
