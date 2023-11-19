import { usePoll, usePollz } from "pollz-react";
import { useEffect, useState } from "react";

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

  const handleVote = async () => {
    if (!poll || !selectedOption) {
      return;
    }

    try {
      setLoading(true);

      const votedPoll = await sdk.vote(
        pollId,
        selectedOption,
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

  useEffect(() => {
    if (confirmToVote) return;

    if (selectedOption) {
      handleVote();
    }
  }, [confirmToVote, selectedOption]);

  return {
    poll,
    selectedOption,
    setSelectedOption,
    loading,
    voted,
    handleVote,
    handleAddOption,
    newOption,
    setNewOption,
    addingOption,
  };
};
