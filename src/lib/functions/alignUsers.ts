import { balkUsers } from "../helpers";

function formatTimeByName(date: Date): string {
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months >= 2) {
    return `${months} months ago`;
  } else if (months === 1) {
    return `1 month ago `;
  } else if (days >= 10) {
    return `${days} days ago`;
  } else if (days >= 2) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `yesterday`;
  } else if (hours >= 1) {
    return `${hours} hours ago `;
  } else if (minutes >= 1) {
    return `${minutes} minutes`;
  } else {
    return `just now`;
  }
}

const shortUsersByTime = () => {
  const now = new Date();
  const changeTimeFormat = balkUsers.map((data) => {
    return {
      ...data,
      date: new Date(data.date),
    };
  });
  const alignUserByTime = changeTimeFormat
    .sort(
      (a, b) =>
        Math.abs(now.getTime() - a.date.getTime()) -
        Math.abs(now.getTime() - b.date.getTime())
    )
    .map((data) => {
      return {
        ...data,
        date: formatTimeByName(data.date),
      };
    });
  return alignUserByTime;
};
export const users = shortUsersByTime();
