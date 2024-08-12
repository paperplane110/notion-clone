import { create } from "zustand";

type SettingProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSetting = create<SettingProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))