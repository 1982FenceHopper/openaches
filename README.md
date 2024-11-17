# OpenACHES

A centralized, locally hosted server for accessing all data relevant to humanitarian and societal events.

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

Note: Visit the [Humanitarian Data Exchange HAPI Site](https://data.humdata.org/hapi) to generate an application identifier since one won't be provided with the server due to security concerns.

## Stack

- Express.js
- thats pretty much it

## About

This basically allows organizations to host this server which can allow them to quickly and quite easily pull data from, governmental and open third-party, data providers ascertaining to current global humanitarian events and crises.

Organizations tend to implement APIs with a ton of routes that require encoding tokens, putting in tons of query parameters, etc.

This project aims to ease that by providing simple and easy-to-remember API routes with very few query parameters, along with doing JSON data manipulation e.g.

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

### Copyright (C) 2024 1982FenceHopper, All Rights Reserved Under GNU AGPLv3, see `LICENSE` for more details
