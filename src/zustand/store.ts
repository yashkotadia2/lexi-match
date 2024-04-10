import { create } from "zustand";

type actionButtonStateTypes = "GO" | "GRADE";
type ActionButtonType = {
  actionButtonState: actionButtonStateTypes;
  setActionButtonState: (string: actionButtonStateTypes) => void;
};

type ResultModalType = {
  wantsToOpen: boolean;
  setWantsToOpen: (boolean: boolean) => void;
};

type SelectedKeyValueType = {
  selectedKeyValue: { [key: string]: string | undefined };
  setSelectedKeyValue: (selectedKeyValue: {
    [key: string]: string | undefined;
  }) => void;
};

const useActionButton = create<ActionButtonType>()((set) => ({
  actionButtonState: "GO" as actionButtonStateTypes,
  setActionButtonState: (actionButtonState) => set({ actionButtonState }),
}));

const useResultModal = create<ResultModalType>()((set) => ({
  wantsToOpen: false,
  setWantsToOpen: (wantsToOpen) => set({ wantsToOpen }),
}));

const useSelectedKeyValue = create<SelectedKeyValueType>()((set) => ({
  selectedKeyValue: {},
  setSelectedKeyValue: (selectedKeyValue) => set({ selectedKeyValue }),
}));

export { useActionButton, useResultModal, useSelectedKeyValue };
