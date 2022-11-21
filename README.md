# FarmAdmin

Proyecto de Aplicaciones de Bases de Datos. Equipo: Ramiro Castellanos Barrón y Leslie Fabiola López. FarmAdmin es una aplicación para giros médicos. Ofrece un portal para que proveedores ofrezcan sus productos, Farmacias ofrezcan productos comprados de proveedores, y venderlos a clientes; y un portal para que clientes compren estos productos.


# Frameworks
## Angular

Se creó una aplicación cliente con un framework de desarrollo de JS.

## .NET

Se creó una aplicación de servidor o API, que atiende a la aplicación cliente y se comunica con la base de datos.

## SQL Server (Base de Datos)

Para desarrollo se usó SQL Server Express y para productivo se usó PostgreSQL.


# Instalación
## Desarollo

- Entrar a carpeta llamada `Farmacias/client` e ingresar `npm i` para instalar packetes de node.
- Dentro de client presionar `ng s`. (Angular serve application).
- Dentro de `Farmacias/API` ejecutar`dotnet watch run`, se corre en el puerto `https://localhost:7000/api/`
- Navegar al puerto `https://localhost:4200/` (Aplicación de Angular)

## Productivo
- Dentro de client correr `ng build`, se crea carpeta dentro de `API/wwwroot` los htmls y js de la aplicación cliente.
- Dentro de API correr `dotnet run` y se sirve la API y la aplicación cliente dentro del puerto `https://localhost:7000/`.
- Automáticamente usa PostgreSQL en productivo.