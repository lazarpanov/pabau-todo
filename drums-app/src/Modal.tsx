import React, { useEffect, useState } from "react";
import type { Drum } from "./App";
import { soundLibrary } from "./sounds";
import './App.css';


type Props = {
  drum?: Drum;
  isOpen: boolean;
  onClose: () => void;
  onSave: (drum: Drum) => void;
  existingKeys: string[];
};

export const EditModal: React.FC<Props> = ({ drum, isOpen, onClose, onSave, existingKeys }) => {
  const [keyTrigger, setKeyTrigger] = useState("");
  const [soundUrl, setSoundUrl] = useState("");

  useEffect(() => {
    if (drum) {
      setKeyTrigger(drum.keyTrigger);
      setSoundUrl(drum.soundUrl);
    }
  }, [drum]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = soundLibrary.find(s => s.soundUrl === soundUrl)?.name || "";
    onSave({ id: drum?.id || Date.now(), keyTrigger, soundUrl, name });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h3>{drum ? "Edit Drum" : "Add Drum"}</h3>

        <label>Key Trigger:</label>
        <select
          value={keyTrigger}
          onChange={(e) => setKeyTrigger(e.target.value)}
          required
        >
          <option value="">Select a key</option>
          {["Q", "W", "E", "R", "T", "Y", "A", "S", "D", "F", "G", "H"].map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <label>Sound:</label>
        <select
          value={soundUrl}
          onChange={(e) => setSoundUrl(e.target.value)}
          required
        >
          <option value="">Select a sound</option>
          {soundLibrary.map((sound) => (
            <option key={sound.soundUrl} value={sound.soundUrl}>
              {sound.name}
            </option>
          ))}
        </select>

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};
