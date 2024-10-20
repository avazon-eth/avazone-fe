export const getIPAs = async (page, num) => {
  const response = await fetch(
    ` https://ava.cast-ing.kr/avatar?page=${page - 1}&limit=${num}`
  );
  const data = await response.json();
  return data;
};
