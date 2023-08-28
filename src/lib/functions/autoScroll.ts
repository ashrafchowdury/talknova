//automatic scroll down function
export const autoScroll = () => {
  setTimeout(() => {
    window.scrollTo({
      top: 99999999999999999,
      behavior: "smooth",
    });
  }, 300);
};
