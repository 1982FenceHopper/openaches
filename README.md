# OpenACHES

**_Open, Accessible, Centralized Humanitarian Environmental System_**

A centralized, locally hostable syntactical-proxy server for accessing all data relevant to humanitarian and societal events.

Currently supports these following providers

- [United Nations Office for the Coordination of Humanitarian Affairs, Humanitarian Data Exchange](https://data.humdata.org) (Support for HXL tags will be integrated)

## Installation

### Quickest And Easiest: Docker

**A docker container will soon be available in the future for quick deployments**

### Most customizable: Local Binary

Clone the github repository

```bash
git clone https://github.com/1982FenceHopper/openaches
```

Create an environment file and fill in required values.

```sh
touch .env
```

```
PORT=[INPUT PORT HERE]
HDX_IDENT=[INPUT HDX IDENTIFIER HERE]
```

### API Keys Required?

Humanitarian Data Exchange - Yes, visit the [Humanitarian Data Exchange HAPI OpenAPI Site](https://data.humdata.org/hapi)

## Stack

- Express.js
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
