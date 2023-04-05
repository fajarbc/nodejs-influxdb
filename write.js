// Create a new InfluxDB instance using configuration values from environment variables
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { hostname } from "node:os";
import { url, token, org, bucket } from './env.mjs'

// writing
const writeApi = new InfluxDB({ url, token }).getWriteApi(org, bucket, "ms"); // s/ms/us/ns
writeApi.useDefaultTags({ location: hostname() }); // tags

// write point with the current (client-side) timestamp
const point1 = new Point("temperature")
  .tag('example', 'write.ts')
  .floatField("value", 20 + Math.round(100 * Math.random()) / 10);
writeApi.writePoint(point1);
console.log(` ${point1}`);

// write point with a custom timestamp
const point2 = new Point("temperature")
  .tag("example", "write.ts")
  .floatField("value", 10 + Math.round(100 * Math.random()) / 10)
  .timestamp(new Date()); // can be also a number, but in writeApi's precision units (s, ms, us, ns)!
writeApi.writePoint(point2);
console.log(` ${point2.toLineProtocol(writeApi)}`);

try {
  await writeApi.close();
  console.log("FINISHED");
} catch (e) {
  console.error(e);
  console.log("\nERROR");
}
