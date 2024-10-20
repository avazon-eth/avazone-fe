export const getDataByCreationId = async (creationId) => {
  const access_token = localStorage.getItem("dynamic_min_authentication_token");
  const response = await fetch(
    ` https://ava.cast-ing.kr/avatar/create/${creationId}`,
    {
      headers: {
        Authorization: "Bearer " + access_token.replace(/^['"]|['"]$/g, ""),
      },
    }
  );
  const data = await response.json();
  return data;
};
