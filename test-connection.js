const { Pool } = require("pg");

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Database connection successful!");
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log("✅ Database query successful:", result.rows[0]);
    
    // Check if users table exists
    const tableResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    if (tableResult.rows[0].exists) {
      console.log("✅ Users table exists!");
      
      // Count users
      const countResult = await client.query('SELECT COUNT(*) FROM users');
      console.log(`📊 Total users in database: ${countResult.rows[0].count}`);
    } else {
      console.log("❌ Users table does not exist!");
    }
    
    client.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  } finally {
    await pool.end();
  }
}

testConnection(); 