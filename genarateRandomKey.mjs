import crypto from 'crypto';
import fs from 'fs';
import os from 'os';

const args = process.argv.slice(2);

const genarateKey = () => {
  // Generate 32 random bytes
  const key = crypto.randomBytes(32);

  // Convert the key to a hexadecimal string for easier storage
  const keyHex = key.toString('hex');

  return keyHex;
};

const setEnvValue = (enviroment, key, value) => {
  const filePath = `./.env.${enviroment}`;

  let data = '';
  try {
    data = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFileSync(filePath, data, 'utf-8');
    }
  }

  const envVars = data.split(os.EOL);
  const line = envVars?.find((el) => el.includes(key));

  if (line) {
    const target = envVars.indexOf(line);
    (!args.includes('dev') && !args.includes('prod')) &&
      envVars.splice(target, 1, `${key}=${value}`);
  } else {
    envVars.push(`${key}=${value}`);
  }

  fs.writeFileSync(filePath, envVars.join(os.EOL));
};

if (args.includes('dev')) {
  setEnvValue('development', 'MAIN_VITE_CRYPTO_SECRET', genarateKey());
}

if (args.includes('prod')) {
  setEnvValue('production', 'MAIN_VITE_CRYPTO_SECRET', genarateKey());
}

if (args.includes('build')) {
  setEnvValue('production', 'MAIN_VITE_CRYPTO_SECRET', genarateKey());
}
