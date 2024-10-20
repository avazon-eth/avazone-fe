export const putToken = async (access_token) => {
  const response = await fetch(
    `https://ava.cast-ing.kr/web-data-session/token`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE5NzY3NjUsInNjb3BlIjoidXNlciIsInN1YiI6MSwidHlwZSI6ImFjY2VzcyJ9.mJJ0vhQV-8y30KfQ02jIq0DcIEMX2A5kIShjQPw2rv41pPhlWWMNstxqHBT3r8Xtk6yLsPww4DkNFQPUh8MlLMU0lOLV5GMXlaWEyK1jpmcU36YBbk2kixt8xL-5Jd5Voksw3f8LfPgo6rSsWWPXmnmIoGGofvc75p6NldHNKYmu0QEwjWL_whpuw3zbFoNDcnPVwejMWIxVBbDHNRVqNbvquCz-ALq6K6QsplV77XRLsg5Lg5xRqNI-vi8-r-ALCJnR1_wnBySrPpNdZROsb44FdRhu3IaoU2CA13oTrvtWW7ByW76LaXCil9w2Xuutf2HWutVxc-IDZHy1s4Qgxg",
      },
      body: JSON.stringify({
        token:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzE5NzY3NjUsInNjb3BlIjoidXNlciIsInN1YiI6MSwidHlwZSI6ImFjY2VzcyJ9.mJJ0vhQV-8y30KfQ02jIq0DcIEMX2A5kIShjQPw2rv41pPhlWWMNstxqHBT3r8Xtk6yLsPww4DkNFQPUh8MlLMU0lOLV5GMXlaWEyK1jpmcU36YBbk2kixt8xL-5Jd5Voksw3f8LfPgo6rSsWWPXmnmIoGGofvc75p6NldHNKYmu0QEwjWL_whpuw3zbFoNDcnPVwejMWIxVBbDHNRVqNbvquCz-ALq6K6QsplV77XRLsg5Lg5xRqNI-vi8-r-ALCJnR1_wnBySrPpNdZROsb44FdRhu3IaoU2CA13oTrvtWW7ByW76LaXCil9w2Xuutf2HWutVxc-IDZHy1s4Qgxg",
      }),
    }
  );
  const data = await response.json();
  return data;
};
