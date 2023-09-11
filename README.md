[![Quarto Publish](https://github.com/vanHeemstraSystems/human-interface-device-management/actions/workflows/publish.yml/badge.svg)](https://github.com/vanHeemstraSystems/human-interface-device-management/actions/workflows/publish.yml)

human-interface-device-management
# Human Interface Device Management

Can be read as "Human Interface Device Management" at https://app.gitbook.com/s/Rs3XPuVclvoj92Exb9AA/

Can be browsed as "Human Interface Device Management" at https://vanheemstrasystems.github.io/human-interface-device-management/

Documentation of this repository is automatically done with Quarto using GitHub Actions as described at https://github.com/vanHeemstraSystems/quarto-to-github-pages/blob/main/300/300/README.md

Based on "How to Run PostgreSQL and pgAdmin Using Docker" at https://towardsdatascience.com/how-to-run-postgresql-and-pgadmin-using-docker-3a6a8ae918b5

Based on "node-hid" at https://github.com/node-hid/node-hid

Based on "SvelteKit" at https://learn.svelte.dev/tutorial/introducing-sveltekit

Create yarn.lock file as follows:

```
$ cd containers/app/main
$ yarn install
```

Run as follows:

```
$ cd containers/app
$ docker-compose --file docker-compose.dev.yml --project-name human-interface-device-management-dev up --build -d
```
