export const putToken = async (access_token) => {
  const response = await fetch(
    `https://ava.cast-ing.kr/web-data-session/token`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token.replace(/^['"]|['"]$/g, ""),
      },
      body: JSON.stringify({
        token: access_token,
      }),
    }
  );
  const data = await response.json();
  return data;
};
