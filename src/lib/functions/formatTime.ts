import { balkUsers } from "../helpers";

export function formatTimeByLastMsg(dateStr: string): string {
  // Parse the input string into a Date object
  const date = new Date(dateStr);

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
  } else if (minutes < 1) {
    return `just now`;
  } else {
    return `New Friend`;
  }
}
