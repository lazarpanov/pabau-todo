import React, { useEffect, useState } from "react";
import { DrumPad } from "./DrumPad";
import { EditModal } from "./Modal";
import "./App.css";

export interface Drum {
  id: number;
  keyTrigger: string;
  name: string;
  soundUrl: string;
}

const App: React.FC = () => {
  const [drums, setDrums] = useState<Drum[]>([
    { keyTrigger: 'Q', name: 'Kick', soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', id: 0 },
    { keyTrigger: 'W', name: '', soundUrl: '', id: 1 },
    { keyTrigger: 'E', name: '', soundUrl: '', id: 2 },
    { keyTrigger: 'R', name: 'Hi-Hat', soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', id: 3 },
    { keyTrigger: 'T', name: '', soundUrl: '', id: 4 },
    { keyTrigger: 'Y', name: 'Clap', soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', id: 5 },
    { keyTrigger: 'A', name: 'Snare', soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', id: 6 },
    { keyTrigger: 'S', name: '', soundUrl: '', id: 7 },
    { keyTrigger: 'D', name: 'Tom', soundUrl: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', id: 8 },
    { keyTrigger: 'F', name: '', soundUrl: '', id: 9 },
    { keyTrigger: 'G', name: '', soundUrl: '', id: 10 },
    { keyTrigger: 'H', name: '', soundUrl: '', id: 11 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDrum, setEditDrum] = useState<Drum | undefined>(undefined);

  const handleKeyDown = (e: KeyboardEvent) => {
    const drum = drums.find((d) => d.keyTrigger.toLowerCase() === e.key.toLowerCase());
    if (drum && drum.soundUrl) {
      const audio = new Audio(drum.soundUrl);
      audio.play();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drums]);

  const openEditModal = (drum: Drum) => {
    setEditDrum(drum);
    setIsModalOpen(true);
  };

  const handleSave = (newDrum: Drum) => {
    setDrums((prev) =>
      prev.map((d) => (d.id === newDrum.id ? newDrum : d))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Drum Machine</h1>
      <div className="pad-container">
        {drums.map((drum) => (
          <DrumPad key={drum.id} drum={drum} onEdit={openEditModal} />
        ))}
      </div>
      <EditModal
        drum={editDrum}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        existingKeys={drums.map((d) => d.keyTrigger)}
      />
    </div>
  );
};

export default App;
