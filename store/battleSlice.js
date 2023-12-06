import { createSlice } from "@reduxjs/toolkit";

export const INACTIVE = 0;
export const ENTRY_ANIMATION = 1;
export const IN_BATTLE = 2;
export const FINISH_SCREEN = 3; //TODO: later on add more when the gameplay becomes more complex

const initialState = {
  status: INACTIVE,
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    startEntryAnimation: (state) => {
      state.status = ENTRY_ANIMATION;
    },
    startBattle: (state) => {
      state.status = IN_BATTLE;
    },

    endBattle: (state) => {
      state.status = FINISH_SCREEN;
    },
    setInactive: (state) => {
      // when leaving to other pages
      state.status = INACTIVE;
    },
  },
});

export const { startEntryAnimation, startBattle, endBattle, setInactive } =
  battleSlice.actions;

export default battleSlice.reducer;
