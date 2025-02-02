export type IMenuItem =
  | "uploads"
  | "audios"
export interface ILayoutState {
  activeMenuItem: IMenuItem | null;
  showMenuItem: boolean;
  showToolboxItem: boolean;
  activeToolboxItem: string | null;
  setActiveMenuItem: (showMenu: IMenuItem | null) => void;
  setShowMenuItem: (showMenuItem: boolean) => void;
  setShowToolboxItem: (showToolboxItem: boolean) => void;
  setActiveToolboxItem: (activeToolboxItem: string | null) => void;
}
