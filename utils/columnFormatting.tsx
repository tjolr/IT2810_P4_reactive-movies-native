/* Converts minutes to a string with hours and minutes */
export const minutesToHourString = (minutes: number): string => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};
