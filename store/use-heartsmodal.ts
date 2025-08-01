import { create } from "zustand";

type HeartsModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useHeartsModal = create<HeartsModalState>
((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useHeartsModal;
