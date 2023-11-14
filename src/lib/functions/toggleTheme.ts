export const toggleTheme = (theme: string | undefined, setTheme: any) => {
  const which = theme?.split("-") as string[];
  theme == `light-${which[1]}`
    ? setTheme(`dark-${which[1]}`)
    : setTheme(`light-${which[1]}`);
};
