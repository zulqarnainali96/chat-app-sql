import mySql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

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
    console.error("Error connecting to MySQL database:", error);
  }
};

// const insertData = async () => {
//   try {
//     // await Connection.query("CREATE TABLE Users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), created_at TIMESTAMP, updated_at TIMESTAMP, avaatar VARCHAR(255), is_active BOOLEAN)");
//     // await Connection.execute("CREATE TABLE Messages (user_id INT,message_id INT AUTO_INCREMENT PRIMARY KEY, messages TEXT, created_at TIMESTAMP)");

//     // await Connection.execute("INSERT INTO Messages (user_id, message_id, messages, created_at) VALUES(?,?,?,?)",[1,3,,finalMessage, new Date()]);

//     const [results] = await Connection.execute("SELECT messages FROM Messages");
//     const d = JSON.parse(results[0].messages);
//     console.log(d);
//   } catch (error) {
//     console.error("Error executing query:", error);
//   }
// };
// insertData();
export default databaseConnection;
