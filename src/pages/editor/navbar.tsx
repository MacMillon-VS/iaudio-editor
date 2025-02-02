import {  useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Download } from "lucide-react";
import { Label } from "@/components/ui/label";
import { download } from "@/utils/download";
import useStore from "@/pages/editor/store/use-store";
import { IDesign } from "@designcombo/types";
import { generateId } from "@designcombo/timeline";
import editLogo from "/audio_editor_logo.png";

const size = {
  width: 1080,
  height: 1920,
};
export default function Navbar() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr 320px",
      }}
      className="pointer-events-none absolute left-0 right-0 top-0 z-[205] flex h-[72px] items-center px-2"
    >
<div className="flex h-12 w-12 items-center justify-center rounded-md bg-background ml-2">
          <img src={editLogo} alt="logo" className="h-7 w-7" />
        </div>
      <div className="absolute right-0  p-4 z-[205] pointer-events-auto flex h-14 items-center justify-end gap-2">
        <div className="flex h-12 items-center gap-2 rounded-md bg-background px-2.5">
          <DownloadPopover />
        </div>
      </div>
    </div>
  );
}


const DownloadPopover = () => {
  const [open, setOpen] = useState(false);
  const {
    tracks,
    trackItemIds,
    trackItemsMap,
    trackItemDetailsMap,
    transitionsMap,
    fps,
  } = useStore();

  const handleExport = () => {
    const data: IDesign = {
      id: generateId(),
      fps,
      tracks,
      size,
      trackItemDetailsMap,
      trackItemIds,
      transitionsMap,
      trackItemsMap,
      transitionIds: [],
      structure: [],
    };
    const jsonData = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonData], { type: "application/json" });
  
    const url = URL.createObjectURL(blob);
    download(url, "design_data");
  
    URL.revokeObjectURL(url);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="flex h-9 w-9 gap-1 border border-border"
          size="icon"
          variant="secondary"
        >
          <Download width={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[250] flex w-60 flex-col gap-4">
            <Label>Export settings</Label>
            <Button className="w-full justify-between" variant="outline">
              <div>MP3</div>
              <ChevronDown width={16} />
            </Button>
            <div>
              <Button onClick={handleExport} className="w-full">
                Export
              </Button>
            </div>
      </PopoverContent>
    </Popover>
  );
};

