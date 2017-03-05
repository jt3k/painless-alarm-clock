const childProcess = require('child_process');
const psTree = require('ps-tree');

const spawnedProsesses = {};

function spawn() {
  const proc = childProcess.spawn.apply(childProcess, arguments);

  spawnedProsesses[proc.pid] = proc;

  proc.on('exit', () => {
    kill(proc.pid, 'SIGKILL', () => {
      delete spawnedProsesses[proc.pid];
    });
  });

  return proc;
}

function kill(
  pid,
  signal = 'SIGKILL',
  callback = () => {}
) {
  psTree(pid, (err, children) => {
    if (err) {
      return;
    }

    [pid]
      .concat(children.map(p => p.PID))
      .forEach(tpid => {
        try {
          process.kill(tpid, signal);
        } catch (ex) {}
      }
    );

    callback();
  });
}

function killall() {
  const childPids = Object.keys(spawnedProsesses);
  childPids.forEach(pid => {
    spawnedProsesses[pid].kill('SIGINT');
  });
}

module.exports = {
  spawn,
  kill,
  killall
};
