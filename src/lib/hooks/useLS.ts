const useLS = () => {
  const setItem = (key: string, data: any) => {
    return localStorage.setItem(key, JSON.stringify(data));
  };
  const getItem = (key: string) => {
    return JSON.parse(localStorage.getItem(key) as any);
  };
  const removeItem = (key: string) => {
    return localStorage.removeItem(key);
  };
  return { setItem, getItem, removeItem };
};

export default useLS;
