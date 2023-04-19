export const config = {
  secrets: {
    jwt: 'a2svg31dev',
  },
  dbUrl: process.env.MONGODB_URL_DEV || process.env.MONGODB_URL || 'mongodb://localhost:27017/a2sv-g31-dev',
};
