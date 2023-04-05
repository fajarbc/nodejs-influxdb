# Setup
1. Setup .env
   ```
   cp env .env
   ```
2. Run influxdb with docker
   ```
   docker compose up -d
   ```
3. Setup
   1. Via UI (reference https://docs.influxdata.com/influxdb/v2.6/install/?t=Docker )
      1. Visit http://localhost:8086
      2. Create API Token from Load Data > API TOKENS
      3. Go to container shell
      4. influx config create -n default -u http://localhost:8086 -o my-org -t API_TOKEN -a
4. Add data
   ```
   node write.js
   ```
5. Read data 
   ```
   node write.js
   ```
