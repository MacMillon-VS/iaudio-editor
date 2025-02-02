// @ts-nocheck
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ADD_AUDIO, dispatch } from "@designcombo/events";
import { generateId } from "@designcombo/timeline";
import { useRef } from "react";
import {useAudioStore} from "../store/use-audio-store";
import AudioItem from "./components/AudioItem";

export const Uploads = () => {
  const uploadedAudios = useAudioStore((state) => state.audios);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const addAudio = useAudioStore((state) => state.addAudio);

  const onInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach((file) => addAudio(file));
    }
  };
const handleAddAudio = (src) => {
    dispatch(ADD_AUDIO, {
      payload: {
        id: generateId(),
        details: { src },
      },
      options: {},
    });
  };
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm flex-none text-text-primary font-medium h-12 flex items-center px-4">
        Upload
      </div>
      <input
        onChange={onInputFileChange}
        ref={inputFileRef}
        type="file"
        className="hidden"
        accept="audio/*"
      />
      <div className="px-4 py-2">
        <div>
        <Button
                onClick={() => {
                  inputFileRef.current?.click();
                }}
                className="flex gap-2 w-full"
                variant="secondary"
              >
                <UploadIcon size={16} /> Upload
              </Button>
        </div>
      </div>

      <ScrollArea>
        {
          uploadedAudios.length !=0 &&
        <div className="px-4 masonry-sm">
          Your audios
        </div>
        }
        {uploadedAudios.length !=0 ? uploadedAudios.map((audio, index) => (
              <AudioItem key={`uploaded-${index}`} handleAddAudio={() => handleAddAudio(audio.src)} audio={audio} />
            )):<p className="text-md text-gray-400 flex items-center justify-center px-4 pt-4">Upload your audio</p>}
      </ScrollArea>
    </div>
  );
};  