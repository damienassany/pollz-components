import { PollTypes } from "pollz-js";
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
  const [selectedOptionIds, setSelectedOptionIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingOption, setAddingOption] = useState(false);
  const [voted, setVoted] = useState(false);

  const initialSelectedOptionIds = useMemo(() => {
    return (
      poll?.options
        .filter((option) =>
          option.voters.some((voter) => voter.userId === userId)
        )
        .map((option) => option.id) || []
    );
  }, [poll, userId]);

  const handleVote = async (optionIds = selectedOptionIds) => {
    if (!poll || !optionIds.length) {
      return;
    }

    try {
      setLoading(true);

      const promises = optionIds.map((id) =>
        sdk.vote(pollId, id, userId, poll.pollType.id)
      );

      const responses = await Promise.all(promises);

      setLoading(false);
      onSubmitted?.(responses[responses.length - 1]);

      if (!withoutFeedback) {
        setVoted(true);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      setLoading(false);
    }
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setAddingOption(true);
      sdk
        .addOption(pollId, newOption.trim())
        .then((updatedPoll) => {
          if (updatedPoll) {
            setNewOption("");
          }
        })
        .finally(() => {
          setAddingOption(false);
        });
    }
  };

  const handleSelectOption = (optionId: number) => {
    if (!poll) return;

    switch (poll.pollType.id) {
      case PollTypes.SingleChoice:
        setSelectedOptionIds([optionId]);
        break;

      case PollTypes.MultipleChoice:
        setSelectedOptionIds((previousIds) =>
          previousIds.includes(optionId)
            ? previousIds.filter((id) => id !== optionId)
            : [...previousIds, optionId]
        );
        break;
      default:
        break;
    }

    if (!confirmToVote) {
      handleVote([optionId]);
    }
  };

  useEffect(() => {
    setSelectedOptionIds(initialSelectedOptionIds);
  }, [initialSelectedOptionIds]);

  return {
    poll,
    selectedOptionIds,
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
