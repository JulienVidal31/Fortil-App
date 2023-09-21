export const environment = {
    production: false,
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT ?? 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.DATABASE_PASSWORD,
      db: process.env.DATABASE_DB,
      socketPath: process.env.DATABASE_SOCKET_PATH,
      expirationTimeResetPassword: parseInt(
        process.env.EXPIRATIONDATERESETPASSWORD
      ),
    }
}