// @ts-nocheck
import { Icons } from "@/components/shared/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AudioTabs = ({ setSelectedTab }) => (
  <Tabs defaultValue="uploded" onValueChange={setSelectedTab} className="w-full">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger className="gap-1" value="presets"><Icons.package width={20} />Presets</TabsTrigger>
      <TabsTrigger className="gap-1" value="uploded"><Icons.folder width={20} />Uploded</TabsTrigger>
    </TabsList>
    
  </Tabs>
);

export default AudioTabs;