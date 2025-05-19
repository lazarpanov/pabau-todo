import React, { useRef } from "react";
import type { Drum } from "./App";

type Props = {
  drum: Drum;
  onEdit: (drum: Drum) => void;
};

export const DrumPad: React.FC<Props> = ({ drum, onEdit }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (drum.soundUrl) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      onEdit(drum);
    }
  };

  return (
    <div className="drum-pad-wrapper">
      <button className="drum-pad" onClick={handleClick}>
        {drum.soundUrl ? (
          <>
            <span className="key">{drum.keyTrigger}</span>
            <span className="label">{drum.name}</span>
            <audio ref={audioRef} src={drum.soundUrl} />
            <button className="edit-button" onClick={() => onEdit(drum)}>
            ✏️
            </button>
          </>
        ) : (
          <span className="plus">+</span>
        )}
      </button>
    </div>
  );
};
