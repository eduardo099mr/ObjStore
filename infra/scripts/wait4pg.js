const { exec } = require("child_process");
let count = 2;

function waitForPg() {
  exec("docker exec objstore-db pg_isready --host=localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      if (count % 2 === 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("\x1b[33mwaiting for PostgreSQL...\x1b");
      }
      if (count % 2 !== 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("\x1b[30mwaiting for PostgreSQL...\x1b");
      }
      count++;
      waitForPg();
      return;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("\x1b[32mPostgreSQL is READY!\x1b\n");
  }
}
process.stdout.write("\x1b[33mwaiting for PostgreSQL...\x1b");
waitForPg();
