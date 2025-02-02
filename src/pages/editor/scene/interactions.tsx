import { useEffect, useRef } from "react";
import Selection from "@interactify/selection";
import Moveable from "@interactify/moveable";
import useStore from "@/pages/editor/store/use-store";
import StateManager from "@designcombo/state";

interface SceneInteractionsProps {
  stateManager: StateManager;
  viewerRef: React.RefObject<any>;
  size: { width: number; height: number };
}
export function SceneInteractions({
  stateManager,
  viewerRef,
}: SceneInteractionsProps) {
  const { setState } =
    useStore();
  const moveableRef = useRef<Moveable>(null);

  useEffect(() => {
    const selection = new Selection({
      container: viewerRef.current?.infiniteViewer.getContainer(),
      boundContainer: true,
      hitRate: 0,
      selectableTargets: [".designcombo-scene-item"],
      selectFromInside: false,
      selectByClick: true,
      toggleContinueSelect: "shift",
    })

    return () => {
      selection.destroy();
    };
  }, []);

  useEffect(() => {
    const activeSelectionSubscription = stateManager.subscribeToActiveIds(
      (newState) => {
        setState(newState);
      },
    );

    return () => {
      activeSelectionSubscription.unsubscribe();
    };
  }, []);


  return (
    <Moveable
      ref={moveableRef}
      className="designcombo-scene-moveable"
    />
  );
}
