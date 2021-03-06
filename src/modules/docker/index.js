import debug from 'debug';
import nodemiral from 'nodemiral';
import path from 'path';
import { resolve } from '../utils';
import {runTaskList} from '../utils';
const log = debug('mup:module:docker');

export function help(/* api */) {
  log('exec => mup docker help');
}

export function setup(api) {
  log('exec => mup docker setup');
  const list = nodemiral.taskList('Setup Docker');

  list.executeScript('setup docker', {
    script: resolve(__dirname, 'assets/docker-setup.sh')
  });

  const sessions = api.getSessions([ 'meteor', 'mongo', 'proxy' ]);
  const rsessions = sessions.reduce((prev, curr) => {
    if (prev.map(session => session._host).indexOf(curr._host) === -1) {
      prev.push(curr);
    }
    return prev;
  }, []);
  return runTaskList(list, rsessions);
}
