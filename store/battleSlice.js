import { createSlice } from "@reduxjs/toolkit";

export const INACTIVE = 0; // outside of the battle page
export const LOADING = 1;
export const ENTRY_ANIMATION = 2;
export const IN_BATTLE = 3;
export const PAUSE_SCREEN = 4;
export const FINISH_SCREEN = 5; //TODO: later on add more when the gameplay becomes more complex

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
    setLoading: (state) => {
      state.status = LOADING;
    },
    pauseGame: (state) => {
      state.status = PAUSE_SCREEN;
    },
    
  },
});

export const {
  startEntryAnimation,
  startBattle,
  endBattle,
  setInactive,
  setLoading,
  pauseGame,
} = battleSlice.actions;

export default battleSlice.reducer;
