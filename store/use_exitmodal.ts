import { create } from "zustand";

type ExitModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useExitModal = create<ExitModalState>
((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useExitModal;
