export const config = {
  secrets: {
    jwt: 'a2svg31prod',
  },
  dbUrl: process.env.MONGODB_URL_PROD || 'mongodb://localhost:27017/a2sv-g31-prod',
};
