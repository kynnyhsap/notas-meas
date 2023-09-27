async function main() {
  const proc = Bun.spawn(["bun", "run", "src/kindle-spy.ts"]);

  // writing the PID to a file in case we need to kill it manually later
  await Bun.write("spy-pid.txt", `${proc.pid}`);
  console.log(`Kindle spy PID: ${proc.pid}`);

  // unref() will detach the child process from the parent process
  proc.unref();
}

main().catch(console.error);
