(async () => {
  console.log("Running...");
  const data = await fetch(
    `http://localhost:2190/api/v1/manifold/hxl?resource_id=7c48c192-36d4-422e-996d-19cc62e2e4fd&column=${encodeURIComponent(
      "#date,#loc+market+name,#value"
    )}`
  )
    .then((res) => res.text())
    .catch((err) => err);

  console.log(data);
})();
