import {useEffect, useRef, useState} from 'react';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const soundFiles = [
  require('../assets/sounds/simonSound1.mp3'),
  require('../assets/sounds/simonSound2.mp3'),
  require('../assets/sounds/simonSound3.mp3'),
  require('../assets/sounds/simonSound4.mp3'),
];

export default function useSounds() {
  const sounds = useRef<Sound[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    sounds.current = soundFiles.map(
      (file, index) =>
        new Sound(file, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log(`Failed to load sound ${index + 1}`, error);
          }
          if (isMounted) setLoaded(prev => !prev);
        }),
    );

    return () => {
      isMounted = false;
      sounds.current.forEach(sound => sound.release());
    };
  }, []);

  return sounds.current;
}
