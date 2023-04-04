require("dotenv").config(); // Load environment variables from .env file
const Influx = require("influx");

// Create a new InfluxDB instance using configuration values from environment variables
const influxConfig = {
  host: process.env.INFLUXDB_HOST,
  port: process.env.INFLUXDB_PORT,
  database: process.env.INFLUXDB_DB,
  username: process.env.INFLUXDB_USER,
  password: process.env.INFLUXDB_USER_PASSWORD,
};
const client = new Influx.InfluxDB(influxConfig);

client
  .getDatabaseNames()
  .then((names) => {
    if (!names.includes(process.env.INFLUXDB_DB)) {
      return client.createDatabase(process.env.INFLUXDB_DB);
    }
  })
  .then(() => {
    console.log("Database ready to use");
  })
  .catch((err) => {
    console.error(`Error creating Influx database! ${err}`);
  });

// Create a new measurement
// client
//   .writePoints([
//     {
//       measurement: "temperature",
//       tags: { room: "living room" },
//       fields: { value: 72 },
//     },
//   ])
//   .catch((err) => {
//     console.error(`Error saving data to InfluxDB! ${err.stack}`);
//   });

// Read data from a measurement
// client
//   .query(
//     `
//     select * from temperature
// `
//   )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.error(`Error querying data from InfluxDB! ${err.stack}`);
//   });

// Update data in a measurement
// client
//   .writePoints(
//     [
//       {
//         measurement: "temperature",
//         tags: { room: "living room" },
//         fields: { value: 75 },
//       },
//     ],
//     {
//       where: { room: "living room" },
//     }
//   )
//   .catch((err) => {
//     console.error(`Error updating data in InfluxDB! ${err.stack}`);
//   });
