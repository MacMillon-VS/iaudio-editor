// @ts-nocheck
import { ScrollArea } from "@/components/ui/scroll-area";
import { AUDIOS } from "@/data/audio";
import { ADD_AUDIO, dispatch } from "@designcombo/events";
import { generateId } from "@designcombo/timeline";
import { useAudioStore } from "../store/use-audio-store"; 
import {  useState } from "react";
import AudioItem from "./components/AudioItem";
import AudioTabs from "./components/AudioTabs";
import { IAudio } from "@designcombo/types";

export const Audios = () => {
  const uploadedAudios = useAudioStore((state) => state.audios);
  const [selectedTab, setSelectedTab] = useState("uploded");



  const handleAddAudio = (src) => {
    dispatch(ADD_AUDIO, {
      payload: {
        id: generateId(),
        details: { src },
      },
      options: {},
    });
  };

  const handleAddAudioPre = (payload:Partial<IAudio>) => {
    dispatch(ADD_AUDIO, {
      payload,
      options: {},
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm flex-none text-text-primary font-medium h-12 flex items-center px-4">
        Audios
      </div>
      <ScrollArea>
        <div className="px-2 flex flex-col">
          <div className="text-sm flex-none text-text-primary font-medium flex items-center px-4">
            Your Library
          </div>
          <div className="px-4 py-2">
            <AudioTabs setSelectedTab={setSelectedTab} />
          </div>
          
          {selectedTab === "presets" &&
            AUDIOS.map((audio, index) => (
              <AudioItem key={index} handleAddAudioPre={handleAddAudioPre} audio={audio} />
            ))}
          {selectedTab === "uploded" && uploadedAudios.length != 0 &&
            uploadedAudios.map((audio, index) => (
              <AudioItem key={`uploaded-${index}`} handleAddAudio={() => handleAddAudio(audio.src)} audio={audio} />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

