export interface Player {
  name: string;
  team: string;
  role: string;
  imagePath?: string;
  standardMean?: number;
  fantaMean?: number;
  quotationClassic?: number;
  quotationMantra?: number;
  FVM1000Classic?: number;
  FVM1000Mantra?: number;
  playedMatches?: number;
  goals?: number;
  goalsHome?: number;
  goalsAway?: number;
  scoredShotsPenalty?: number;
  totalShotsPenalty?: number;
  assists?: number;
  autogoals?: number;
  goalsConceded?: number;
  goalsConcededHome?: number;
  goalsConcededAway?: number;
  yellowCards?: number;
  redCards?: number;
  starterTimes?: number;
  starterPercentage?: number;
  enteredTimes?: number;
  enteredPercentage?: number;
  disqualifiedTimes?: number;
  disqualifiedPercentage?: number;
  injuredTimes?: number;
  injuredPercentage?: number;
  unusedTimes?: number;
  unusedPercentage?: number;

  isFavourite?: boolean;
}
