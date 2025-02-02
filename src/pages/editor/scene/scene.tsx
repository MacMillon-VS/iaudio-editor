import { Player } from "../player";
import Viewer from "@interactify/infinite-viewer";
import { useRef } from "react";
import useStore from "@/pages/editor/store/use-store";
import StateManager from "@designcombo/state";
import useZoom from "../hooks/use-zoom";
import { SceneInteractions } from "./interactions";

export default function Scene({
  stateManager,
}: {
  stateManager: StateManager;
}) {
  const viewerRef = useRef<Viewer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { size } = useStore();
  const { zoom, handlePinch } = useZoom(containerRef, viewerRef, size);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        flex: 1,
      }}
    >
      <Viewer
        ref={viewerRef}
        className="player-container bg-scene"
        displayHorizontalScroll={false}
        displayVerticalScroll={false}
        zoom={zoom}
        usePinch={true}
        pinchThreshold={50}
        onPinch={handlePinch}
      >
        <div >
          <Player />
          <SceneInteractions
            stateManager={stateManager}
            viewerRef={viewerRef}
            size={size}
          />
        </div>
      </Viewer>
    </div>
  );
}
