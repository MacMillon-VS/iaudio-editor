import { AbsoluteFill, Audio } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import {
  IAudio,
  IItem,
  ITrackItem,
} from "@designcombo/types";
import { calculateFrames } from "./sequence-item";

const REMOTION_SAFE_FRAME = 5;

interface IAnimation {
  idObject: string;
  type: string;
}

interface SequenceItemOptions {
  fps: number;
  animations?: IAnimation[];
}

export const TransitionSequenceItem: Record<
  string,
  (item: IItem, options: SequenceItemOptions) => JSX.Element
> = {
  audio: (item: ITrackItem, options: SequenceItemOptions) => {
    const { fps } = options;
    const { details } = item as IAudio;
    const { durationInFrames } = calculateFrames(item.display, fps);
    const trim = item.trim!;
    return (
      <TransitionSeries.Sequence
        className={`designcombo-scene-item id-${item.id} designcombo-scene-item-type-${item.type}`}
        key={item.id}
        durationInFrames={durationInFrames + REMOTION_SAFE_FRAME}
        style={{
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <AbsoluteFill>
          <Audio
            startFrom={(trim.from / 1000) * fps}
            endAt={(trim.to / 1000) * fps + REMOTION_SAFE_FRAME}
            src={details.src}
            volume={(details.volume || 0) / 100}
          />
        </AbsoluteFill>
      </TransitionSeries.Sequence>
    );
  },
};
