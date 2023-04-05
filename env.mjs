import dotenv from "dotenv";
dotenv.config();

const url = process.env.INFLUXDB_HOST + ":" + process.env.INFLUXDB_PORT;
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;
export {url, token, org, bucket}