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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
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
  };
};
