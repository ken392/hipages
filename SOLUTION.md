Your Solution Documentation
===========================
## How to run
1. Run Docker
- Database is initialized
```bash
docker-compose up -d
```

2. Run Server
- Please run the server on your local machine
Prism is not working on the image. (I can fix it but need research)
```log
2023-11-19 05:09:12 PrismaClientInitializationError: Prisma Client could not locate the Query Engine for runtime "linux-musl-arm64-openssl-3.0.x".
2023-11-19 05:09:12 This happened because Prisma Client was generated for "darwin-arm64", but the actual deployment required "linux-musl-arm64-openssl-3.0.x".
```
```bash
cd server
npm run dev  (or npm start)
```
- Please access http://localhost:8080/jobs

3. Run UI
```bash
cd ui
# local dev version
npm run dev

# build version with preview
npm run build
npm run preview
```
- Please access http://localhost:3000/


## SETUP
### Docker 
1. Update the image of "mysq:5.6" to "mariadb:10.5.8" with platform: linux/amd64
> Reason: I use M1 mac and mysql:5.6 image doesn't support M1, so changed to mariadb

2. update the image of node to be version18 
> Reason: In order to support vite & latest MUI UI library

```yaml
  ui:
    image: node:18.18-alpine
  database:
    image: mariadb:10.5.8
    platform: linux/amd64
```

### UI
1. Decided not to use the boilerplate provided 
> Reason: To descrese development time with using MUI for UI library and vite for middleware

#### Installation
```bash
# 1. Build Project
npm create vite ui --template react-ts

# 2. Install MUI
npm i @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material

# 3. jest
npm i 'jest@^28.0.0' 'ts-jest@^28.0.0' '@types/jest@^28.0.0'
```

### Server
1. Install prisma to access the prepared database (mysql)
```bash
npm i -D prisma cors
```

2. Generate model from the existing scheme
```bash
npx prisma db pull
```

## Development
### STEP1 build backend
1. Built 2 api end-points in express + prisma architecture in the boilerplates
> Reason to use Prisma: Prisma is well-known ORM library and handy to use. I picked the technology to reduce the development cost.
There are many other options like Nest JS, Next Js, TypeORM etc, but the overhead is a little bit bigger than using Prisma for this assessment purpose.

### STEP2 build ui
1. Choose MUI (Material UI) as UI library
> Regarding React UI library, there are so many options. The major selections are MUI, Ant Design, Semantic etc. The reason to choose MUI this time is 
a) Easy to apply theme
b) Very easy to integrate
c) Similar design of the assessment request

2. Folder design
> To make is easy to maintain the source codes, the most of components needs to be design "small" and "loose coupling" and "easier to be unit tested"
That's the reason to make many files in the UI folder

