import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import useSounds from './useSounds';
import {resetUserSequence, showModal} from '../redux/appSlice';

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type ReturnedTypes = {
  isActive: boolean;
  score: number;
  next: () => void;
  restartGame: () => void;
  simonTurn: boolean;
  currentColorId: number | undefined;
  setCurrentColorId: (id: any) => void;
};

const useGame = (): ReturnedTypes => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [simonTurn, setSimonTurn] = useState(false);
  const [currentColorId, setCurrentColorId] = useState<number>();

  const enteredSequence = useSelector(
    (state: RootState) => state.appState.sequence,
  );
  const dispatch = useDispatch();
  let score = sequence.length - 1;
  const sound = useSounds();

  useEffect(() => {
    if (enteredSequence.length > 0) {
      let isEqual = compareSequence(enteredSequence);
      isEqual === true && enteredSequence.length === sequence.length && next();
    }
  }, [enteredSequence]);

  useEffect(() => {
    triggerSimonTurn();
  }, [sequence]);

  const next = useCallback(async () => {
    dispatch(resetUserSequence());
    let nextElement = randomInteger(1, 4);
    setSequence(sequence => [...sequence, nextElement]);
  }, [dispatch]);

  const abortGame = useCallback(() => {
    setIsActive(false);
    dispatch(showModal());
  }, [dispatch]);

  const restartGame = useCallback(() => {
    setSequence([]);
    setIsActive(true);
    next();
  }, [next]);

  const compareSequence = useCallback(
    (userSequence: number[]): boolean => {
      let isEqual = false;
      if (sequence.length > 0) {
        sequence.forEach((item, index) => {
          if (item != userSequence[index] && userSequence[index] != undefined)
            return abortGame();
          isEqual = true;
        });
      } else return false;
      return isEqual;
    },
    [sequence, abortGame],
  );

  const triggerColorsInSequence = useCallback(async () => {
    return new Promise(async resolve => {
      for (let i = 0; i < sequence.length; i++) {
        let duration = (sound[sequence[i] - 1]?.getDuration() || 0.3) * 1000;
        setCurrentColorId(-1);
        await new Promise(resolve => setTimeout(resolve, duration));
        setCurrentColorId(sequence[i]);
        sound[sequence[i] - 1]?.play();
        await new Promise(resolve => setTimeout(resolve, duration));
      }
      setCurrentColorId(-1);
      resolve('done');
    });
  }, [sound, sequence]);

  const triggerSimonTurn = useCallback(async () => {
    if (isActive) {
      setSimonTurn(true);
      await triggerColorsInSequence();
      setSimonTurn(false);
    }
  }, [isActive, triggerColorsInSequence]);

  return {
    isActive,
    score,
    next,
    restartGame,
    simonTurn,
    currentColorId,
    setCurrentColorId,
  };
};
export default useGame;
