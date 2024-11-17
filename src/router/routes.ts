const ROUTES = {
  lander: "/",
  api: {
    global_root: "/api",
    local_root: "/",
    countries: {
      global: "/api/v1/countries",
      local: "/v1/countries",
    },
  },
};

Object.freeze(ROUTES);
export default ROUTES;
