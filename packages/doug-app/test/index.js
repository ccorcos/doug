import test from 'ava'
import shell from 'shelljs'
import exists from 'doug/utils/exists'

shell.config.fatal = true

test('doug-app', (t) => {
  // initialize doug-app
  shell.cd('~')
  shell.exec('doug-app init doug-app-test')
  t.truthy(exists('~/doug-app-test'))
  const TESTDIR = '~/doug-app-test'

  // link doug-app
  shell.cd(TESTDIR})
  shell.exec('npm link doug-app')

  // setup local git origin
  shell.cd('~')
  shell.mkdir('doug-app-origin')
  shell.cd('doug-app-origin')
  shell.exec('git init --bare')
  const ORIGINDIR = '~/doug-app-origin'

  // push initial commit
  shell.cd(TESTDIR)
  shell.exec([
    'git init',
    'git add .',
    'git config --global user.email "test@test.com"',
    'git config --global user.name "Doug Test"',
    'git commit -m "doug-app-test"',
    `git remote add origin ${ORIGINDIR}`,
    'git push origin master',
  ].join('; '))

  // doug-app test
  shell.cd(TESTDIR)
  shell.exec('doug-app test')

  // doug-app build
  shell.cd(TESTDIR)
  shell.exec('doug-app build')
  t.truthy(exists('dist'))

  // // doug-app deploy
  // shell.cd(TESTDIR)
  // shell.exec('doug-app deploy')
  // shell.cd(ORIGINDIR)
  // // check that a gh_pages branch was created
  // t.truthy(shell.exec('git branch | grep gh_pages').stdout.trim())

  const version = () => shell.cat('~/doug-app-test/package.json').grep(/"version"/).match(/(version": ?")([^"]+)/)[2]

  // doug-app release
  const prev = version()
  shell.cd(TESTDIR)
  shell.exec('doug-app release minor')
  const next = version()
  t.not(prev, next)
  shell.cd(ORIGINDIR)
  // check that the tag was pushed
  shell.truthy(shell.exec(`git tag | grep ${next}`).trim())

  // doug-app dev
  shell.cd(TESTDIR)
  const child = shell.exec('doug-app dev', {async: true})
  const tries = 50
  shell.exec('sleep 10')
  while(tries > 0) {
    const result = shell.exec('curl http://localhost:3000').stdout.trim()
    if (result.match(/<title>Website<\/title>/)) {
      break;
    }
    tries--
    shell.exec('sleep 1')
  }
  child.kill('SIGTERM')
  t.not(tries, 0)
})
