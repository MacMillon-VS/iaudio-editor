import { create } from "zustand";

export interface Audio {
  id: string;
  name: string;
  src: string;
}

export interface AudioStore {
  audios: Audio[];
  addAudio: (file: File) => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  audios: [],
  addAudio: (file) => {
    const newAudio = {
      id: crypto.randomUUID(),
      name: file.name,
      src: URL.createObjectURL(file),
    };

    set((state) => ({
      audios: [...state.audios, newAudio],
    }));
  },
}));
