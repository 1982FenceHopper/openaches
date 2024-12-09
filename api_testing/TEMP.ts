(async () => {
  console.log("Running...");
  const data = await fetch("http://localhost:2190/api/v1/cds?country=AFG")
    .then((res) => res.json())
    .catch((err) => err);

  const pov_rate_data: Array<any> =
    data.result.contexts.population_and_socioeconomy.pov_rate;

  const mpi_data = pov_rate_data
    .filter(
      (doc: any) =>
        doc.provider_admin1_name.length > 0 && doc.provider_admin1_name != "FCT"
    )
    .map((doc: any) => doc.mpi)
    .flat();
  const mpi_average =
    mpi_data.reduce((acc, curr) => acc + curr, 0) / mpi_data.length;

  const verdict =
    mpi_average < 0.25
      ? "Relatively low calamity state"
      : mpi_average < 0.5
      ? "Relatively moderate calamity state"
      : mpi_average < 0.75
      ? "Relatively high calamity state"
      : "Extremely high calamity state";

  console.log("MPI Data for Afghanistan");
  console.dir(mpi_data, { depth: 1 });
  console.log("\nMPI Average for Afghanistan");
  console.log(`${mpi_average.toFixed(2)}/1`);
  console.log(`\nVerdict: ${verdict}`);
})();
