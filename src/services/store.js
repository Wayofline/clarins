import { create } from "zustand";

const langStore = create((set, get) => ({
  //values
  lang:"Fr",
  //actions
  actions : {
    toggleLang : () => (set(() => ({lang : swapLang(get().lang)})))
  }
}));

const popupStore = create((set) => ({
  popupId: -1,
  popupStep : "closed", // "closed" | "opening" | "closing"
  actions : {
    closing : () => (set({popupStep : "closing"})),
    setPopup : (newPopup) => (set({popupId : newPopup, popupStep : "opening"})),
  }
}));

const stepStore = create((set, get) => ({
  actions : {
    goHome : () => (set(() => ({step : 0}))),
    nextStep : () => (set(() => ({step : get().step +1}))),
  },
  step:0,
}));

function swapLang(current){
  return current === "Fr"
    ? "En"
    : "Fr";
}

export const lang = () => langStore((state) => state.lang);
export const langActions = () => langStore((state) => state.actions);

export const popupId = () => popupStore((state) => state.popupId);
export const popupStep = () => popupStore((state) => state.popupStep);
export const popupActions = () => popupStore((state) => state.actions);

export const step = () => stepStore((state) => state.step);
export const stepActions = () => stepStore((state) => state.actions);