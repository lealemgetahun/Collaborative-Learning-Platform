export const config = {
  secrets: {
    jwt: 'a2svg31test',
  },
  dbUrl: process.env.MONGODB_URL_TEST || 'mongodb://localhost:27017/a2sv-g31-test',
};
