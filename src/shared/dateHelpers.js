export const getTimeDurationInDisplayFormat = durationInSeconds => {
  const hours = Math.trunc(durationInSeconds / 3600);
  const minutes = Math.trunc((durationInSeconds % 3600) / 60);
  return hours === 0 ? `${minutes} min` : `${hours} h ${minutes} min`;
};
