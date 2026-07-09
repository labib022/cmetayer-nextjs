// src/redux/features/cms/cmsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Home Page
  hero: null,
  services: null,
  clients: null,
  cards: null,

  // Services Pages
  repairSection: null,
  laundrySection: null,
  movingSection: null,

  // Others
  faqs: null,
  aboutSystem: null,
};

const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    setHero: (state, action) => { state.hero = action.payload; },
    setServices: (state, action) => { state.services = action.payload; },
    setClients: (state, action) => { state.clients = action.payload; },
    setCards: (state, action) => { state.cards = action.payload; },
    setRepairSection: (state, action) => { state.repairSection = action.payload; },
    setLaundrySection: (state, action) => { state.laundrySection = action.payload; },
    setMovingSection: (state, action) => { state.movingSection = action.payload; },
    setFaqs: (state, action) => { state.faqs = action.payload; },
    setAboutSystem: (state, action) => { state.aboutSystem = action.payload; },
  },
});

export const {
  setHero,
  setServices,
  setClients,
  setCards,
  setRepairSection,
  setLaundrySection,
  setMovingSection,
  setFaqs,
  setAboutSystem,
} = cmsSlice.actions;

export default cmsSlice.reducer;