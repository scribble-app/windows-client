const getTime = (time: number): string => {
  const elapsed = Math.round(Date.now() / 1000) - time;

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = week * 4;
  const year = month * 12;

  if (Math.round(elapsed / year) > 0) {
    return `${Math.round(elapsed / year)} years ago`;
  } else if (Math.round(elapsed / month) > 0) {
    return `${Math.round(elapsed / month)} months ago`;
  } else if (Math.round(elapsed / week) > 0) {
    return `${Math.round(elapsed / week)} weeks ago`;
  } else if (Math.round(elapsed / day) > 0) {
    return `${Math.round(elapsed / day)} days ago`;
  } else if (Math.round(elapsed / hour) > 0) {
    return `${Math.round(elapsed / hour)} hours ago`;
  } else if (Math.round(elapsed / minute) > 0) {
    return `${Math.round(elapsed / minute)} minutes ago`;
  } else {
    return "just now";
  }
};

export default getTime;
