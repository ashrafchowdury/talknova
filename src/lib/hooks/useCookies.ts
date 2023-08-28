import Cookies from "js-cookie";

const useCookies = () => {
  const createSession = (id: string) =>
    Cookies.set("userId", id, { secure: true });
  const getSession = () => Cookies.get("userId");
  const removeSession = () => Cookies.remove("userId");

  const uid = getSession();

  return { createSession, removeSession, uid };
};

export default useCookies;
