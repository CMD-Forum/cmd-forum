const prompts = require('prompts');
var spawn = require('child_process').spawn;
var fs = require('fs'); 

const setup_questions = [
  {
    type: 'select',
    name: 'SETUP_FUNCTION',
    message: 'What do you want to do?',
    choices: [
      { title: 'Create the .env file (required)', value: '.env' },
      /*{ title: 'Initalize CMD (required)', value: 'InitalizeCMD' },*/
      { title: 'Build a Docker Image', value: 'DockerImage' },
    ],
  },
];

const env_questions = [
  {
    type: 'text',
    name: 'DATABASE_URL',
    message: 'DATABASE_URL'
  },
  {
    type: 'password',
    name: 'AUTH_SECRET',
    message: 'AUTH_SECRET'
  },
  {
    type: 'password',
    name: 'GITHUB_CLIENT_ID',
    message: 'GITHUB_CLIENT_ID',
  },
  {
    type: 'password',
    name: 'GITHUB_CLIENT_SECRET',
    message: 'GITHUB_CLIENT_SECRET',
  },
  {
    type: 'text',
    name: 'NEXT_PUBLIC_METADATA_BASE_URL_DEV',
    message: 'NEXT_PUBLIC_METADATA_BASE_URL_DEV',
  },
  {
    type: 'text',
    name: 'NEXT_PUBLIC_METADATA_BASE_URL_PROD',
    message: 'NEXT_PUBLIC_METADATA_BASE_URL_PROD',
  },
];

const BuildDockerImage = async () => {
  console.log("Preparing to build Docker Image...");
  const dockerbuild = spawn('docker', [
    'build',
    '--platform',
    'linux/amd64',
    '-t',
    'cmd-forum-docker',
    '.'
  ], { stdio: 'inherit' });

  dockerbuild.on('exit', (code) => {
    if (code === 0) {
      console.log('\x1b[2m%s\x1b[0m', '┌────────────────────────────────────────────────────────────────────────────┐');
      process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  \x1b[32m✔  Docker Build Finished\x1b[0m');process.stdout.write('                                                     \x1b[2m│\x1b[0m');console.log();
      process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  Your image should now be accessible through Docker as `cmd-forum-docker`');process.stdout.write('  \x1b[2m│\x1b[0m');console.log();
      console.log('\x1b[2m%s\x1b[0m', '└────────────────────────────────────────────────────────────────────────────┘');
    } else {
      console.log('\x1b[2m%s\x1b[0m', '┌──────────────────────────────────────────────────────────────┐');
      process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  \x1b[31m✘  Docker Build Failed\x1b[0m');process.stdout.write('                                         \x1b[2m│\x1b[0m');console.log();
      process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write(`  Exit Code: 1\x1b[0m`);process.stdout.write('                                                \x1b[2m│\x1b[0m');console.log();
      console.log('\x1b[2m%s\x1b[0m', '└──────────────────────────────────────────────────────────────┘');
    }
  });

}

/*const InitalizeCMD = async () => {
  console.log("Initalizing CMD...");
  const npminstall = spawn('npm', [
    'install',
  ], { stdio: 'inherit', cwd: "C:/Users/James/Desktop/cmd_nextjs/cmd-forum" });
  const prismagenerate = spawn('npx', [
    'prisma generate',
  ], { stdio: 'inherit' });

  prismagenerate.on('exit', (code) => {
    if (code === 0) {
      console.log('\x1b[2m%s\x1b[0m', '┌────────────────────────────────────────────────────────────────────────────┐');
      process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  \x1b[32m✔  Docker Build Finished\x1b[0m');process.stdout.write('                                                     \x1b[2m│\x1b[0m');console.log();
      process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  Your image should now be accessible through Docker as `cmd-forum-docker`');process.stdout.write('  \x1b[2m│\x1b[0m');console.log();
      console.log('\x1b[2m%s\x1b[0m', '└────────────────────────────────────────────────────────────────────────────┘');
    } else {
      console.log('\x1b[2m%s\x1b[0m', '┌──────────────────────────────────────────────────────────────┐');
      process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  \x1b[31m✘  Docker Build Failed\x1b[0m');process.stdout.write('                                         \x1b[2m│\x1b[0m');console.log();
      process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write(`  Exit Code: 1\x1b[0m`);process.stdout.write('                                                \x1b[2m│\x1b[0m');console.log();
      console.log('\x1b[2m%s\x1b[0m', '└──────────────────────────────────────────────────────────────┘');
    }
  });

}*/

//prompts.inject([ 'postgresql://postgres:postgres@localhost:5432/cmd?schema=public', 'K02yoC4ehURT8AfmXg3IRQQU5Cp8i+j4YZX+q6mZYmc=', '6e57e9cab9d9106f33f4', '7dd7e69f65914c0440175e12cc92b35772f62d75', 'https://localhost:3000', 'https://cmd-forum.vercel.app' ]);

// console.log('\x1b[33m%s\x1b[0m', 'Sorry, this isn\'t available yet.');
console.log('\x1b[2m%s\x1b[0m', '┌──────────────────────────────────────────────────────────────┐');
process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  Welcome to the CMD/> Setup.');process.stdout.write('                                 \x1b[2m│\x1b[0m');console.log();
process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  Please select what you want to do below.');process.stdout.write('                    \x1b[2m│\x1b[0m');console.log();
process.stdout.write('\x1b[2m│\x1b[0m');process.stdout.write('  See instructions at ');process.stdout.write('\x1b[4mhttps://github.com/CMD-Forum/cmd-forum\x1b[0m');process.stdout.write('  \x1b[2m│\x1b[0m');console.log();
console.log('\x1b[2m%s\x1b[0m', '└──────────────────────────────────────────────────────────────┘');
console.log();
(async () => {
  const setup_res = await prompts(setup_questions);
  switch (setup_res.SETUP_FUNCTION) {
    case ".env":
      const env_res = await prompts(env_questions);
      console.log(env_res);
      Object.entries(env_res).forEach(([key, value]) => {
        fs.appendFileSync('.env', `\n${key}=${value}\n`);
      });
      break;
    /*case "InitalizeCMD":
      InitalizeCMD();
      break;*/
    case "DockerImage":
      BuildDockerImage();
      break;
  }
})();