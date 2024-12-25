# OpenACHES

**_Open, Accessible, Centralized Humanitarian Environmental System_**

A centralized, locally hostable syntactical-proxy server for accessing all data relevant to humanitarian and societal events.

Currently supports these following providers

- [United Nations Office for the Coordination of Humanitarian Affairs, Humanitarian Data Exchange](https://data.humdata.org) (HXL Supported)

## Installation

### API Keys

Humanitarian Data Exchange (HDX) - Visit the [Humanitarian Data Exchange HAPI OpenAPI Site](https://data.humdata.org/hapi)

### Environment Variables

- `PORT` - The port for the server to run on
- `HDX_IDENT` - Your HDX identifier, acts as the API key basically

### Quickest And Easiest: Docker

Option 1: Command Line

```bash
$: docker run -d -e PORT=[PORT] -e HDX_IDENT="[HDX_IDENT]" -p [PORT]:[PORT] --name openaches 1982fencehopper/openaches:latest
```

Option 2: Docker Compose

```yml
services:
  app:
    image: 1982fencehopper/openaches:latest
    container_name: openaches
    restart: unless-stopped
    ports:
      - [PORT]:[PORT]
    environment:
      - PORT=[PORT]
      - HDX_IDENT="[HDX_IDENT]"
```

### Most customizable: Local Running (requires `bun` and `python3.9`)

Clone the github repository and change working directory

```bash
$: git clone https://github.com/1982FenceHopper/openaches
```

```bash
$: cd openaches/
```

Create an environment file and fill in required values.

```bash
$: touch .env
```

```
PORT=[PORT]
HDX_IDENT=[HDX_IDENT]
```

Run the server

```bash
$: bun run dev
```

Query the server for available endpoints

```bash
$: curl http://localhost:[PORT]/api/v1
```

```json
{
  "status": 200,
  "endpoints": {
    "hdx": {
      "description": "Data retrieval from the Humanitarian Data Exchange",
      "countries": {
        "description": "Return list of available countries",
        "route": "/api/v1/countries",
        "params": {
          "index": "Number of results to skip, useful for pagination"
        }
      },
      "cds": {
        "description": "Return country specific details",
        "route": "/api/v1/cds",
        "params": {
          "country": "ISO3166-1 Alpha-3 country code to return details about",
          "index": "Number of results to skip in each subattribute of details, useful for subattr. pagination"
        }
      },
      "fp": {
        "description": "Returns country food pricing data, result is given as a CSV",
        "route": "/api/v1/fp",
        "params": {
          "country": "ISO3166-1 Alpha-3 country code to return details about"
        }
      }
    },
    "manifold": {
      "description": "Allows manipulation of various CSV data (e.g. data-prep, ML)",
      "route": "/api/v1/manifold",
      "subroutes": {
        "status": {
          "description": "Returns status of Manifolding Server",
          "route": "/api/v1/manifold/status"
        },
        "hxl": {
          "description": "Manipulate data via HXL tags, query GET /api/v1/manifold for required params",
          "route": "/api/v1/manifold/hxl"
        }
      }
    }
  }
}
```

## Stack

- Express.js (TypeScript)
- FastAPI (Python)
- pandas (Python)
- thats pretty much it

## About

This basically allows involved third-parties to host a server that can allow them to quickly and quite easily pull data from, governmental and other open third-party, data providers ascertaining to current global humanitarian events, crises and archived data for further research into potential solutions, or preventative indicators.

Humanitarian organizations tend to implement APIs with a ton of routes that require encoding tokens, putting in tons of query parameters, etc.

This project aims to ease that by providing simple and easy-to-remember API routes with very few query parameters, along with doing JSON data manipulation to aggregate all results partaining to a specific platform

### Example

One API route on OpenACHES -> Multiple API routes on HDX

Visualization of above (**api.openaches.dev is a fictional link**)

```
Fetching this endpoint --> https://api.openaches.dev/api/v1/countries?index=0

|
|
v

Contacts all of these...

https://hapi.humdata.org/api/v1/metadata/location?output_format=json&app_identifier=[HDX_IDENT]&limit=100&offset=0

https://hapi.humdata.org/api/v1/metadata/admin1?output_format=json&app_identifier=[HDX_IDENT]&limit=100&offset=0

https://hapi.humdata.org/api/v1/metadata/admin2?output_format=json&app_identifier=[HDX_IDENT]&limit=100&offset=0
```

## License

```
Copyright (C) 2024 1982FenceHopper

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
```
