import TimeCount from "./TimeCount";
import * as timerHook from "react-timer-hook";
import { useProvider } from "test-data-provider";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";
import type {
  TimerState,
  QuestionType,
} from "../../../../../types/globalTypes";
import { render, act } from "@testing-library/react";

interface TimerConfigProviderEntry {
  timerState: TimerState;
  questionType: QuestionType;
  expectedTime?: number;
  functionsToCall?: ("setTimerState" | "nextQuestion")[];
  functionArgument?: string;
  description: string;
}

jest.mock("../../../../../context/egzamControls/egzamControls", () => {
  return {
    useEgzamControlContext: jest.fn(),
  };
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

const timerConfigProvider: TimerConfigProviderEntry[] = [
  {
    timerState: "prepare",
    questionType: "basic",
    expectedTime: 20,
    functionsToCall: ["setTimerState"],
    functionArgument: "wait",
    description:
      "calls setTimerState with 'wait' if previous timer state was 'prepare' after 20 seconds",
  },
  {
    timerState: "ansewer",
    questionType: "basic",
    expectedTime: 15,
    functionsToCall: ["nextQuestion"],
    description:
      "calls nextQuestion if previous timer state was 'ansewer' after 15 seconds",
  },

  {
    timerState: "ansewer",
    questionType: "specialized",
    expectedTime: 50,
    functionsToCall: ["setTimerState", "nextQuestion"],
    description:
      "calls nextQuestion afrer 50 seconds when type is 'specialized'",
  },

  /*   {
    timerState: "prepare",
    questionType: "specialized",
    expectedTime: 1001,
    functionsToCall: ["setTimerState"],
    functionArgument: "ansewer",
    description: "automatically moves to ansewer state when type is 'specialized'"
  }, */

  {
    timerState: "wait",
    questionType: "basic",
    description: "doesn't expire if timer state is 'wait' and type 'basic",
  },
  {
    timerState: "wait",
    questionType: "specialized",
    functionsToCall: ["setTimerState"],
    functionArgument: "ansewer",
    description:
      "doesn't expire if timer state is 'wait' and type 'specialized",
  },
];

const dummyContextValue = {
  timerState: "prepare",
  setTimerState: jest.fn(),
  nextQuestion: jest.fn(),
  questionCount: 1,
};

describe("on expire behavior", () => {
  /* useProvider(timerConfigProvider, (testData) => {
    const {
      timerState,
      questionType,
      expectedTime,
      functionsToCall,
      functionArgument,
      description,
    } = testData;

    it(description, () => {
      //arrange
      const timeInMs = expectedTime ? expectedTime * 1000 : 999999;
      const possibleFunctionsToCall = [
        "nextQuestion",
        "setTimerState",
      ] as const;
      const functionsNotToCall = possibleFunctionsToCall.filter(
        (fn) => !functionsToCall?.includes(fn)
      );

      const context = useEgzamControlContext as jest.Mock;
      context.mockReturnValue({ ...dummyContextValue, timerState });
      render(<TimeCount type={questionType} />);

      //act
      act(() => {
        jest.advanceTimersByTime(timeInMs - 1000);
      });

      //assert
      possibleFunctionsToCall.forEach((fn) => {
        expect(dummyContextValue[fn]).not.toBeCalled();
      });
      act(() => {
        jest.advanceTimersByTime(1002);
      });
      functionsToCall?.forEach((fn) => {
        if (functionArgument) {
          expect(dummyContextValue[fn]).toBeCalledWith(functionArgument);
        } else {
          expect(dummyContextValue[fn]).toBeCalledWith();
        }
      });

      functionsNotToCall.forEach((fn) => {
        expect(dummyContextValue[fn]).not.toBeCalled();
      });
    });
  }); */

  it("calls setTimerState with 'wait' if previous timer state was 'prepare' after 20 seconds", () => {
    //arrange
    const context = useEgzamControlContext as jest.Mock;
    context.mockReturnValue(dummyContextValue);
    render(<TimeCount type="basic" />);

    //act
    act(() => {
      jest.advanceTimersByTime(19001);
    });

    //assert
    expect(dummyContextValue.setTimerState).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    expect(dummyContextValue.nextQuestion).not.toBeCalled();
    expect(dummyContextValue.setTimerState).toBeCalledWith("wait");
  });
  it("calls nextQuestion if previous timer state was 'ansewer' after 15 seconds", () => {
    //arrange
    const context = useEgzamControlContext as jest.Mock;
    context.mockReturnValue({
      ...dummyContextValue,
      timerState: "ansewer",
    });
    render(<TimeCount type="basic" />);

    //act
    act(() => {
      jest.advanceTimersByTime(14001);
    });

    //assert
    expect(dummyContextValue.nextQuestion).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    expect(dummyContextValue.setTimerState).not.toBeCalled();
    expect(dummyContextValue.nextQuestion).toBeCalledWith();
  });
  it("doesn't expire if timer state is 'wait'", () => {
    //arrange
    const context = useEgzamControlContext as jest.Mock;
    context.mockReturnValue({ ...dummyContextValue, timerState: "wait" });
    render(<TimeCount type="basic" />);

    //act
    act(() => {
      jest.advanceTimersByTime(99999);
    });

    //assert
    expect(dummyContextValue.nextQuestion).not.toBeCalled();
    expect(dummyContextValue.setTimerState).not.toBeCalled();
  });
  it("expires afrer 50 seconds when type is 'specialized'", () => {
    //arrange
    const context = useEgzamControlContext as jest.Mock;
    context.mockReturnValue(dummyContextValue);
    render(<TimeCount type="specialized" />);

    //act
    act(() => {
      jest.advanceTimersByTime(40001);
    });

    //assert
    expect(dummyContextValue.nextQuestion).not.toBeCalled();
    expect(dummyContextValue.setTimerState).not.toBeCalledWith("wait");
    act(() => {
      jest.advanceTimersByTime(10001);
    });
    expect(dummyContextValue.setTimerState).toBeCalledWith("ansewer");
  });
});

describe("appearance", () => {});

it("s", () => {});
