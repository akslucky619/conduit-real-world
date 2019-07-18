export default function customFetch(
  url = "",
  data = {},
  token = "",
  method = "POST"
) {
  // Default options are marked with *
  return fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      Authorization: token,
      "Content-Type": "application/json"

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(res => {
    if (res.status !== 200) {
      console.log("fetch fail");
    } else {
      return res.json();
    }
  });
}
