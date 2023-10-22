import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import useSounds from './useSounds';
import { resetUserSequence, showModal, triggerColor } from '../redux/appSlice';

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type ReturnedTypes = {
  isActive: boolean;
  score: number;
  next: () => void;
  restartGame: () => void;
  simonTurn: boolean;
};

const useGame = (): ReturnedTypes => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [simonTurn, setSimonTurn] = useState(false);
  const initialRender = useRef(true);
  const enteredSequence = useSelector(
    (state: RootState) => state.appState.sequence,
  );
  const dispatch = useDispatch();
  var score = sequence.length - 1;
  const sound = useSounds();

  useEffect(() => {
    if (enteredSequence.length > 0) {
      let isEqual = compareSequence(enteredSequence);
      isEqual === true && enteredSequence.length === sequence.length && next();
    }
  }, [enteredSequence]);

  useEffect(() => {
    initialRender.current === true && next();
    initialRender.current = false;
  }, [initialRender.current]);

  useEffect(() => {
    triggerSimonTurn();
  }, [sequence, isActive]);

  const next = async () => {
    dispatch(resetUserSequence());
    let nextElement = randomInteger(1, 4);
    setSequence(sequence => [...sequence, nextElement]);
  };

  const abortGame = () => {
    setIsActive(false);
    dispatch(showModal());
  };

  const restartGame = () => {
    setSequence([]);
    initialRender.current = true;
    setIsActive(true);
  };

  const compareSequence = (userSequence: number[]): boolean => {
    let isEqual = false;
    if (sequence.length > 0) {
      sequence.forEach((element, idx) => {
        if (element != userSequence[idx] && userSequence[idx] != undefined)
          return abortGame();
        isEqual = true;
      });
    } else return false;
    return isEqual;
  };

  const triggerSimonTurn = async () => {
    if (isActive) {
      setSimonTurn(true);
      await triggerColorsInSequence();
      setSimonTurn(false);
    }
  };

  const triggerColorsInSequence = async () => {
    return new Promise(async resolve => {
      let i;
      await new Promise(resolve => setTimeout(resolve, 500));
      for (i = 0; i < sequence.length; i++) {
        dispatch(triggerColor(-1));
        await new Promise(resolve => setTimeout(resolve, 300));
        dispatch(triggerColor(sequence[i]));
        sound[sequence[i] - 1]?.play();
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      dispatch(triggerColor(-1));
      resolve('done');
    });
  };
  return {isActive, score, next, restartGame, simonTurn};
};
export default useGame;
