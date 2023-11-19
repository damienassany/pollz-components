import { act, renderHook } from "@testing-library/react-hooks";
import { PollWithOptions } from "pollz-js";
import { hook } from "../hook";

const mockPoll = {
  appId: 123,
  createdAt: new Date(),
  id: 123,
  name: "My poll",
  options: [
    {
      id: 1,
      label: "Option 1",
      pollId: 123,
      voters: [],
    },
    {
      id: 2,
      label: "Option 2",
      pollId: 123,
      voters: [],
    },
  ],
  pollType: {
    id: 1,
    name: "Single choice",
  },
  totalVotes: 0,
};

const mockVote = jest.fn().mockImplementation(() => Promise.resolve(mockPoll));
const mockAddOption = jest
  .fn()
  .mockImplementation(() => Promise.resolve(mockPoll));
const mockOnSubmitted = jest.fn();

jest.mock("pollz-react", () => ({
  usePollz: () => ({
    sdk: {
      vote: mockVote,
      addOption: mockAddOption,
    },
  }),
  usePoll: () => ({
    poll: mockPoll as PollWithOptions,
    refecth: jest.fn(),
  }),
}));

describe("hook", () => {
  const pollId = mockPoll.id;
  const userId = "user123";
  const confirmToVote = true;
  const withoutFeedback = false;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      hook(pollId, userId, confirmToVote, withoutFeedback, mockOnSubmitted)
    );

    expect(result.current.poll).toEqual(mockPoll);
    expect(result.current.selectedOption).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.voted).toBe(false);
  });

  it("should handle vote", async () => {
    const { result } = renderHook(() =>
      hook(pollId, userId, confirmToVote, withoutFeedback, mockOnSubmitted)
    );

    await act(async () => {
      await result.current.setSelectedOption(1);
    });

    await act(async () => {
      await result.current.handleVote();
    });

    expect(mockVote).toHaveBeenCalledWith(
      pollId,
      1,
      userId,
      mockPoll.pollType.id
    );
    expect(result.current.loading).toBe(false);
    expect(mockOnSubmitted).toHaveBeenCalledWith(expect.any(Object));
    expect(result.current.voted).toBe(!withoutFeedback);
  });

  it("should not handle vote if poll or selected option is missing", async () => {
    const { result } = renderHook(() =>
      hook(pollId, userId, confirmToVote, withoutFeedback, mockOnSubmitted)
    );

    await act(async () => {
      await result.current.handleVote();
    });

    expect(mockVote).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(mockOnSubmitted).not.toHaveBeenCalled();
    expect(result.current.voted).toBe(false);
  });

  it("should handle vote when confirmToVote is false and selected option is set", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      hook(pollId, userId, false, withoutFeedback, mockOnSubmitted)
    );

    const selectedOption = 1;

    act(() => {
      result.current.setSelectedOption(selectedOption);
    });

    await act(async () => {
      await result.current.handleVote();
    });

    expect(mockVote).toHaveBeenCalledWith(
      pollId,
      selectedOption,
      userId,
      mockPoll.pollType.id
    );
    expect(result.current.loading).toBe(false);
    expect(mockOnSubmitted).toHaveBeenCalledWith(expect.any(Object));
    expect(result.current.voted).toBe(!withoutFeedback);
  });

  it("should not handle vote when confirmToVote is true", async () => {
    const { result } = renderHook(() =>
      hook(pollId, userId, true, withoutFeedback, mockOnSubmitted)
    );

    const selectedOption = 1;

    act(() => {
      result.current.setSelectedOption(selectedOption);
    });

    expect(mockVote).not.toHaveBeenCalled();
    expect(mockOnSubmitted).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.handleVote();
    });

    expect(mockVote).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(mockOnSubmitted).toHaveBeenCalled();
    expect(result.current.voted).toBe(true);
  });

  it("should handle add option", async () => {
    const { result } = renderHook(() =>
      hook(pollId, userId, confirmToVote, withoutFeedback, mockOnSubmitted)
    );

    const newOption = "New option";

    act(() => {
      result.current.setNewOption(newOption);
    });

    await act(async () => {
      await result.current.handleAddOption();
    });

    expect(mockAddOption).toHaveBeenCalledWith(pollId, newOption.trim());
    expect(result.current.addingOption).toBe(false);
    expect(result.current.newOption).toBe("");
  });
});
