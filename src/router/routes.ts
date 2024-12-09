const ROUTES = {
  lander: "/",
  api: {
    global_root: "/api",
    local_root: "/",
    hdx: {
      global_root: "/api/v1/hdx",
      local_root: "/v1/hdx",
      countries: {
        global_root: "/api/v1/hdx/countries",
        local_root: "/v1/hdx/countries",
      },
      cds: {
        global_root: "/api/v1/hdx/cds",
        local_root: "/v1/hdx/cds",
      },
      fp: {
        global_root: "/api/v1/hdx/fp",
        local_root: "/v1/hdx/fp",
      },
    },
    manifold: {
      global_root: "/api/v1/manifold",
      local_root: "/v1/manifold",
      hxl: {
        global_root: "/api/v1/manifold/hxl",
        local_root: "/v1/manifold/hxl",
      },
    },
  },
};

Object.freeze(ROUTES);
export default ROUTES;
