(async () => {
  console.log("Running...");
  const data = await fetch("http://localhost:2190/api/v1/cds?country=NGA")
    .then((res) => res.json())
    .catch((err) => err);

  const food_price_data: Array<any> =
    data.result.contexts.food_and_nutrition.food_price;

  const order_by_admin1 = food_price_data.reduce((acc: any, idx: any) => {
    if (!acc[idx.location_name]) {
      acc[idx.location_name] = {};
    }

    if (!acc[idx.location_name][idx.provider_admin1_name]) {
      acc[idx.location_name][idx.provider_admin1_name] = {};
    }

    if (
      !acc[idx.location_name][idx.provider_admin1_name][
        idx.provider_admin2_name
      ]
    ) {
      acc[idx.location_name][idx.provider_admin1_name][
        idx.provider_admin2_name
      ] = [];
    }

    acc[idx.location_name][idx.provider_admin1_name][
      idx.provider_admin2_name
    ].push({
      commodity_name: idx.commodity_name,
      commodity_code: idx.commodity_code,
      commodity_category: idx.commodity_category,
      price: idx.price,
      price_flag: idx.price_flag,
      price_type: idx.price_type,
      currency_code: idx.currency_code,
      unit: idx.unit,
      reference_period_start: idx.reference_period_start,
      reference_period_end: idx.reference_period_end,
      market_name: idx.market_name,
      market_code: idx.market_code,
      lat: idx.lat,
      lon: idx.lon,
    });

    return acc;
  }, {});

  console.dir(order_by_admin1, { depth: 1 });
})();
