// @ts-nocheck
import { Music } from "lucide-react";

const AudioItem = ({ audio, handleAddAudio, handleAddAudioPre }) => {
  return (
    <>
    {handleAddAudioPre ?
    <div
      onClick={()=>handleAddAudioPre(audio)}
      className="px-2 py-1 gap-4 text-sm hover:bg-zinc-800/70 cursor-pointer grid grid-cols-[48px_1fr]"
    >
      <div className="bg-zinc-800 flex items-center justify-center h-12">
        <Music width={16} />
      </div>
      <div className="flex flex-col justify-center">
        <div>{audio.name}</div>
      </div>
    </div>:<div
      onClick={handleAddAudio}
      className="px-2 py-1 gap-4 text-sm hover:bg-zinc-800/70 cursor-pointer grid grid-cols-[48px_1fr]"
    >
      <div className="bg-zinc-800 flex items-center justify-center h-12">
        <Music width={16} />
      </div>
      <div className="flex flex-col justify-center">
        <div>{audio.name}</div>
      </div>
    </div>}
    </>
  );
};

export default AudioItem;