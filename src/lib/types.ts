export type Preset = string;

export type Interaction = {
  id: string;
  preset?: Preset;
  input: string;
  output: string;
  timestamp: number;
};

export type Analytics = {
  totalInteractions: number;
  presetUsage: Record<Preset, number>;
};

export type InteractionsState = {
  history: Interaction[];
  analytics: Analytics;
};
