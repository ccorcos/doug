import test from 'ava'
import shell from 'shelljs'
import exists from 'doug/utils/exists'

shell.config.fatal = true

test('doug-lib', (t) => {
  // initialize doug-lib
  shell.cd('~')
  shell.exec('doug-lib init doug-lib-test')
  t.truthy(exists('~/doug-lib-test'))
  const TESTDIR = '~/doug-lib-test'

  // link doug-lib
  shell.cd(TESTDIR})
  shell.exec('npm link doug-lib')

  // setup local git origin
  shell.cd('~')
  shell.mkdir('doug-lib-origin')
  shell.cd('doug-lib-origin')
  shell.exec('git init --bare')
  const ORIGINDIR = '~/doug-lib-origin'

  // push initial commit
  shell.cd(TESTDIR)
  shell.exec([
    'git init',
    'git add .',
    'git config --global user.email "test@test.com"',
    'git config --global user.name "Doug Test"',
    'git commit -m "doug-lib-test"',
    `git remote add origin ${ORIGINDIR}`,
    'git push origin master',
  ].join('; '))

  // doug-lib test
  shell.cd(TESTDIR)
  shell.exec('doug-lib test')

  // doug-lib build
  shell.cd(TESTDIR)
  shell.exec('doug-lib build')
  t.truthy(exists('lib'))

  // doug-lib release
  const prev = version()
  shell.cd(TESTDIR)
  shell.exec('doug-lib release minor')
  const next = version()
  t.not(prev, next)
  shell.cd(ORIGINDIR)
  // check that the tag was pushed
  shell.truthy(shell.exec(`git tag | grep ${next}`).trim())
})
