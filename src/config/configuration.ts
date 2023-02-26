export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  logLevel: process.env.LOG_LEVEL || 'info',
});
