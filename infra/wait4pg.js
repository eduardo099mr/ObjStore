const { exec } = require("node:child_process");

function waitForPostgres(){
  exec("docker exec postgres-obj pg_isready --host localhost", handleReturn);
  
  function handleReturn(error, stdout){
    
    if(stdout.search("accepting connections") === -1){
      process.stdout.write(".");
      waitForPostgres();
      return;
    
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("\nOK");
  
  }
}

console.log("WAIT PG...");
waitForPostgres();