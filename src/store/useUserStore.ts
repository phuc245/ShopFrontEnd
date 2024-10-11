import { create } from "zustand";

type ModalState = {
  _id: string;
  name: string;
  modalDelete: boolean;
};

interface ModalUserStore extends ModalState {
  setModalDelete: (
    open: boolean,
    props?: { _id: string; name: string }
  ) => void;
}

export const useUserStore = create<ModalUserStore>((set) => ({
  _id: "",
  name: "",
  modalDelete: false,
  setModalDelete: (open, data) => set({ ...data, modalDelete: open }),
}));
