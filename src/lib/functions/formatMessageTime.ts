import { Timestamp } from "firebase/firestore";

export const formatMessageTime = (timestamp: Timestamp) => {
  try {
    const date = timestamp?.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedDate = `${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(date.getDate()).padStart(2, "0")} ${String(
      formattedHours
    ).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${amOrPm}`;
    return formattedDate;
  } catch (error) {
    return "";
  }
};
