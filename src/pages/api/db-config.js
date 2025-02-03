export const dbConfig = {
  server: "db-2220032.database.windows.net",
  authentication: {
    type: "default",
    options: {
      userName: "db-2220032",
      password: "Opendb112"
    }
  },
  options: {
    encrypt: true,
    database: "db-2220032",
    trustServerCertificate: true,
    port: 1433,
    rowCollectionOnRequestCompletion: true,
    useUTC: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};