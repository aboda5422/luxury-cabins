import fs from "fs";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const password = process.env.SUPABASE_DB_PASSWORD;
if (!password) {
  console.error("Missing SUPABASE_DB_PASSWORD");
  process.exit(1);
}

const client = new pg.Client({
  host: "db.lyxbpebabwiicobkaohi.supabase.co",
  port: 5432,
  user: "postgres",
  password,
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

const sqlPath = path.join(
  root,
  "supabase/migrations/20260714193000_cms_and_analytics.sql",
);
const sql = fs.readFileSync(sqlPath, "utf8");

await client.connect();
try {
  await client.query(sql);
  const tables = await client.query(
    `select table_name
     from information_schema.tables
     where table_schema = 'public'
       and table_name in ('cms_state', 'analytics_state')
     order by 1`,
  );
  const bucket = await client.query(
    `select id, public from storage.buckets where id = 'uploads'`,
  );
  console.log(
    JSON.stringify({ ok: true, tables: tables.rows, bucket: bucket.rows }, null, 2),
  );
} finally {
  await client.end();
}
