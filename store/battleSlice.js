import { createSlice } from "@reduxjs/toolkit";

export const INACTIVE = "INACTIVE"; // outside of the battle page
export const LOADING = "LOADING";
export const ENTRY_ANIMATION = "ENTRY_ANIMATION";
export const IN_BATTLE = "IN_BATTLE";
export const FINISH_EXERCISE_BOARD = "FINISH_BOARD";
export const PAUSE_SCREEN = "PAUSE_SCREEN";
export const MUL_SCREEN = "MUL_SCREEN";
export const HELP_SCREEN = "HELP_SCREEN";
export const FINISH_SCREEN = "FINISH_SCREEN";
export const MULTIPLICATION_TABLE_SCREEN = "MULTIPLICATION_TABLE_SCREEN";
export const LOSS_SCREEN = "LOSS_SCREEN";
export const VICTORY_SCREEN = "VICTORY_SCREEN";

const initialState = {
  inBattlePage: false,
  settings: {
    inBattle: false,
    pause: false,
    status: INACTIVE,
    loading: false,
    sentResult: false,
    opponentSentResult: false,
    shortenedTime: false,
    timeOver: false,
    timeLeftAfterShortened: 10,
    inFinishLevelScreen: false,
  },
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    moveToBattlePage: (state) => {
      if (!state.inBattlePage) {
        state.inBattlePage = true;
      }
    },
    startEntryAnimation: (state) => {
      state.settings.loading = false;
      state.settings.status = ENTRY_ANIMATION;
    },
    startBattle: (state) => {
      state.settings.status = IN_BATTLE;
      state.settings.inBattle = true;
    },

    endBattle: (state) => {
      state.settings.status = FINISH_LEVEL_SCREEN;
    },
    setInactive: (state) => {
      // when leaving to other pages
      state.settings.status = INACTIVE;
    },
    setStatus: (state, action) => {
      state.settings.status = action.payload;
    },
    setLoading: (state) => {
      state.settings.loading = true;
      state.settings.status = LOADING;
    },
    pauseGame: (state) => {
      state.settings.pause = true;
      state.settings.inBattle = false;
    },
    unPauseGame: (state) => {
      state.settings.pause = false;
      state.settings.inBattle = true;
      state.settings.status = IN_BATTLE;
    },
    setSentResult: (state) => {
      state.settings.sentResult = true;
    },

    setOpponentSentResult: (state) => {
      state.settings.opponentSentResult = true;
    },
    setShortenedTime: (state) => {
      state.settings.shortenedTime = true;
    },
    setInFinishLevelScreen: (state, action) => {
      state.settings.inFinishLevelScreen = action.payload;
    },
    setTimeOver: (state) => {
      state.settings.timeOver = true;
    },
    resetSettingsNewExercise: (state) => {
      state.settings.sentResult = false;
      state.settings.pause = false;
      state.settings.loading = false;
      state.settings.timeOver = false;
      state.settings.opponentSentResult = false;
      state.settings.inBattle = true;
      state.settings.status = IN_BATTLE;
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
  setStatus,
  moveToBattlePage,
  unPauseGame,
  setSentResult,
  setOpponentSentResult,
  resetSettingsNewExercise,
  setShortenedTime,
  setTimeOver,
  setInFinishLevelScreen,
} = battleSlice.actions;

export default battleSlice.reducer;
