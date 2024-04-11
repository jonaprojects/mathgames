import { createSlice } from "@reduxjs/toolkit";

// STATUS VALUES (SCREENS - THIS WILL FORCE THE UI)
export const INACTIVE = "INACTIVE"; // outside of the battle page
export const LOADING = "LOADING";
export const ENTRY_ANIMATION = "ENTRY_ANIMATION";
export const IN_BATTLE = "IN_BATTLE";
export const FINISH_EXERCISE_BOARD = "FINISH_BOARD";
export const MUL_SCREEN = "MUL_SCREEN";
export const FINISH_SCREEN = "FINISH_SCREEN";
export const LOSS_SCREEN = "LOSS_SCREEN";
export const VICTORY_SCREEN = "VICTORY_SCREEN";
export const TIE_SCREEN = "TIE_SCREEN";

export const LOCKED_LEVEL = "LOCKED_LEVEL";

// MODALS - CAN BE ON TOP OF THE SCREENS
export const MULTIPLICATION_TABLE_MODAL = "MULTIPLICATION_TABLE_MODAL";
export const HELP_MODAL = "HELP_MODAL";
export const PAUSE_MODAL = "PAUSE_MODAL";

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
    currentModal: null,
    addedScores: false,
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
    setAddedScores: (state, action) => {
      state.settings.addedScores = action.payload;
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
    setLocked: (state) => {
      state.settings.status = LOCKED_LEVEL;
      state.settings.loading = false;
    },
    pauseGame: (state) => {
      state.settings.pause = true;
      state.settings.inBattle = false;
    },
    unPauseGame: (state) => {
      state.settings.pause = false;
      state.settings.inBattle = true;
    },
    setSentResult: (state) => {
      state.settings.sentResult = true;
    },
    setCurrentModal: (state, action) => {
      state.settings.currentModal = action.payload;
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
      state.settings.addedScores = false;
      state.settings.currentModal = null;
      state.settings.shortenedTime = false;
      state.settings.inFinishLevelScreen = false;
      state.inBattlePage = true;
      state.inBattle = true;
    },
    resetSettingsNewLevel: (state) => {
      state.settings.sentResult = false;
      state.settings.pause = false;
      state.settings.loading = false;
      state.settings.timeOver = false;
      state.settings.opponentSentResult = false;
      state.settings.inBattle = true;
      state.settings.status = IN_BATTLE;
      state.settings.addedScores = false;
      state.settings.currentModal = null;
      state.settings.shortenedTime = false;
      state.settings.inFinishLevelScreen = false;
    },
    resetSettingsOnOtherPages: (state) => {
      state.settings.inBattle = false;
      state.inBattlePage = false;
      state.settings.status = INACTIVE;
      state.settings.addedScores = false;
      state.settings.shortenedTime = false;
      state.settings.inFinishLevelScreen = false;
      state.settings.opponentSentResult = false;
      state.settings.timeOver = false;
      state.settings.pause = false;
      state.settings.currentModal = false;
    },
  },
});

export const {
  startEntryAnimation,
  startBattle,
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
  setLocked,
  setCurrentModal,
  setAddedScores,
  resetSettingsNewLevel,
  resetSettingsOnOtherPages,
} = battleSlice.actions;

export default battleSlice.reducer;
