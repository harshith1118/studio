"use client";

import { useReducer, useEffect } from "react";
import type { InteractionsState, Interaction, Preset } from "@/lib/types";

const LOCAL_STORAGE_KEY = "ai-demo-widget-interactions";

type Action =
  | { type: "ADD_INTERACTION"; payload: { input: string; output: string; preset?: Preset } }
  | { type: "CLEAR_HISTORY" }
  | { type: "HYDRATE_STATE"; payload: InteractionsState };

const initialState: InteractionsState = {
  history: [],
  analytics: {
    totalInteractions: 0,
    presetUsage: {},
  },
};

function interactionsReducer(state: InteractionsState, action: Action): InteractionsState {
  switch (action.type) {
    case "ADD_INTERACTION": {
      const { input, output, preset } = action.payload;
      const newInteraction: Interaction = {
        id: crypto.randomUUID(),
        input,
        output,
        preset,
        timestamp: Date.now(),
      };

      const newHistory = [newInteraction, ...state.history].slice(0, 50); // Keep last 50 interactions

      const newPresetUsage = { ...state.analytics.presetUsage };
      if (preset) {
        newPresetUsage[preset] = (newPresetUsage[preset] || 0) + 1;
      }

      return {
        history: newHistory,
        analytics: {
          totalInteractions: state.analytics.totalInteractions + 1,
          presetUsage: newPresetUsage,
        },
      };
    }
    case "CLEAR_HISTORY":
      return initialState;
    case "HYDRATE_STATE":
      return action.payload;
    default:
      return state;
  }
}

export function useInteractions() {
  const [state, dispatch] = useReducer(interactionsReducer, initialState);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedState) {
        dispatch({ type: "HYDRATE_STATE", payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [state]);

  return { state, dispatch };
}
