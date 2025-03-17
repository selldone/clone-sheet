

### Create Migration
```bash
npx sequelize-cli migration:generate --name create-products
```

### Create Migration + Model
```bash
npx sequelize-cli model:generate --name Product --attributes title:string,price:float
```

### Migrate
```bash
npx sequelize-cli db:migrate
```


### Run
```bash
node index.js   
```


# NocoDB

Setup Docker:
```bash
docker run -d \
  --name noco \
  -v "$(pwd)"/nocodb:/usr/app/data/ \
  -p 8080:8080 \
  nocodb/nocodb:latest
```