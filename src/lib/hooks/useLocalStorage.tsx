const useLocalStorage = (key: string) => {
  const setItem = (data: any) => {
    return localStorage.setItem(key, JSON.stringify(data));
  };
  const getItem = () => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
    return null;
  };
  const removeItem = () => {
    return localStorage.removeItem(key);
  };
  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
