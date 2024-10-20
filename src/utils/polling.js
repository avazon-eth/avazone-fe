export const polling = async (sessionId) => {
  const access_token = localStorage.getItem("dynamic_min_authentication_token");

  const response = await fetch(
    `https://ava.cast-ing.kr/web-data-session/data/fetch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token.replace(/^['"]|['"]$/g, ""),
      },
      body: JSON.stringify({
        session_id: sessionId,
      }),
    }
  );
  const data = await response.json();
  return data;
};
