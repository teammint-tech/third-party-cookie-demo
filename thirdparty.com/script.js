fetch("https://thirdparty.com/track", {
  method: "POST",
  credentials: "include",
  body: JSON.stringify({
    keyword: window.location.href.split("/").pop(),
  }),
});
