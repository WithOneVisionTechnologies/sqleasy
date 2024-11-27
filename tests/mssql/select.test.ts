import { MssqlSqlEasy } from "../../mod.ts";
import { assertEquals } from "@std/assert";

Deno.test("select all", () => {
   const sqlEasy = MssqlSqlEasy.NewMssqlSqlEasy();
   const builder = sqlEasy.newBuilder();
   builder.selectAll().fromTable("users", "u");

   const sql = builder.parseRaw();
   assertEquals(sql.sql, "SELECT * FROM [dbo].[users] AS [u];");
});
