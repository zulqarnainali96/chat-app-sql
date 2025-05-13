import mySql from "mysql2/promise";

export const Connection = await mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});


const databaseConnection = async () => {
  try {
   await Connection.connect();
    console.log("Connected to MySQL database");
  } catch (error) {
    console.error("Error Connecting to MySQL database:",);
  }
};
export default databaseConnection;
