# DatasetBlockchain
A project to execute dataset validation

## Setting up Frontend
```
cd dist
npm install -g http-server
http-server -c-1 -p 8081
```

## Setting up backend
```
git clone https://github.com/plant99/ph-back.git
cd api
npm install
```

Edit Config.js to your db setttings.
```
./node_modules/.bin/sequelize db:migrate
```

## Setting up IPFS

```
sudo ipfs daemon
```
