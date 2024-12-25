(async () => {
  const data = await fetch("http://localhost:4170/manifold", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file: "http://localhost:8000/temp.csv",
      tags: "#date,#adm1+name",
    }),
  })
    .then((res) => res.text())
    .catch((err) => err);

  console.log(data);
})();
