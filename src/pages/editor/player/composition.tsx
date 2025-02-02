import useStore from "@/pages/editor/store/use-store";
import { SequenceItem } from "./sequence-item";
import { useEffect, useState } from "react";
import {
  EDIT_OBJECT,
  ENTER_EDIT_MODE,
  dispatch,
  filter,
  subject,
} from "@designcombo/events";
import { merge } from "lodash";
import { groupTrackItems } from "../utils/track-items";
import { TransitionSeries } from "@remotion/transitions";
import { populateTransitionIds } from "../utils/scene";
import { TransitionSequenceItem } from "./transition-sequence-item";

const Composition = () => {
  const [editableTextId, setEditableTextId] = useState<string | null>(null);
  const {
    trackItemIds,
    trackItemsMap,
    fps,
    trackItemDetailsMap,
    transitionsMap,
  } = useStore();

  const mergedTrackItemsDeatilsMap = merge(trackItemsMap, trackItemDetailsMap);

  const groupedItems = groupTrackItems({
    trackItemIds,
    transitionsMap,
    trackItemsMap: mergedTrackItemsDeatilsMap,
  });

  //   handle track and track item events - updates
  useEffect(() => {
    const stateEvents = subject.pipe(
      filter(({ key }) => key.startsWith(ENTER_EDIT_MODE)),
    );

    const subscription = stateEvents.subscribe((obj) => {
      if (obj.key === ENTER_EDIT_MODE) {
        if (editableTextId) {
          // get element by  data-text-id={id}
          const element = document.querySelector(
            `[data-text-id="${editableTextId}"]`,
          );

          dispatch(EDIT_OBJECT, {
            payload: {
              [editableTextId]: {
                details: {
                  text: element?.textContent || "",
                },
              },
            },
          });
        }
        setEditableTextId(obj.value?.payload.id);
      }
    });
    return () => subscription.unsubscribe();
  }, [editableTextId]);

  return (
    <>
      {groupedItems.map((group, index) => {
        if (group.length === 1) {
          const item = mergedTrackItemsDeatilsMap[group[0]];
          return SequenceItem[item.type](item, {
            fps,
          });
        }
        const firstTrackItem = mergedTrackItemsDeatilsMap[group[0]];
        const from = (firstTrackItem.display.from / 1000) * fps;
        return (
          <TransitionSeries from={from} key={index}>
            {populateTransitionIds(group).map((id, index) => {
              if (index % 2 === 0) {
                const item = mergedTrackItemsDeatilsMap[id];
                return TransitionSequenceItem[item.type](item, {
                  fps,
                });
              }
            })}
          </TransitionSeries>
        );
      })}
    </>
  );
};

export default Composition;
