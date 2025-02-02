import { ItemType } from "@designcombo/types";
import { useCallback, useEffect, useState } from "react";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import useLayoutStore from "./store/use-layout-store"; 
import useStore from "./store/use-store";

export default function ControlList() {
  const { activeIds, trackItemsMap } = useStore();
  const [controlType, setControlType] = useState<ItemType | null>(null);

  useEffect(() => {
    if (activeIds.length === 1) {
      const [id] = activeIds;
      const trackItem = trackItemsMap[id];
      if (trackItem) {
        setControlType(trackItem.type);
      }
    } else {
      setControlType(null);
    }
  }, [activeIds, trackItemsMap]);

  return <>{controlType && <ControlMenu controlType={controlType} />}</>;
}

function ControlMenu({ controlType }: { controlType: ItemType }) {
  const { setShowToolboxItem, setActiveToolboxItem, activeToolboxItem } =
    useLayoutStore();

  const openToolboxItem = useCallback(
    (type: string) => {
      if (type === activeToolboxItem) {
        setShowToolboxItem(false);
        setActiveToolboxItem(null);
      } else {
        setShowToolboxItem(true);
        setActiveToolboxItem(type);
      }
    },
    [activeToolboxItem]
  );

  return (
    <div
      style={{ zIndex: 201 }}
      className="w-14 py-2 absolute mt-10 top-3/4 -translate-y-1/2 left-2.5 bg-background/80 backdrop-filter backdrop-blur-lg  rounded-lg shadow-lg flex flex-col   items-center"
    >
      {
        {
          audio: (
            <AudioMenuList
              activeToolboxItem={activeToolboxItem!}
              type={controlType}
              openToolboxItem={openToolboxItem}
            />
          )
        }[controlType as "audio"]
      }
    </div>
  );
}

const AudioMenuList = ({
  openToolboxItem,
  type,
  activeToolboxItem
}: {
  openToolboxItem: (type: string) => void;
  type: ItemType;
  activeToolboxItem: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <BasicMenuListItem
        activeToolboxItem={activeToolboxItem}
        openToolboxItem={openToolboxItem}
        type={type}
      />
    </div>
  );
};


const BasicMenuListItem = ({
  openToolboxItem,
  type,
  activeToolboxItem
}: {
  openToolboxItem: (type: string) => void;
  type: string;
  activeToolboxItem: string;
}) => {
  return (
    <Button
      size="icon"
      onClick={() => openToolboxItem(`basic-${type}`)}
      variant={`basic-${type}` === activeToolboxItem ? "secondary" : "ghost"}
      className={
        `basic-${type}` !== activeToolboxItem ? "text-muted-foreground" : ""
      }
    >
      <Icons.edit width={35} />
    </Button>
  );
};
