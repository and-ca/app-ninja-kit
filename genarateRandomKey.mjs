import crypto from 'crypto';

// Generate 32 random bytes
const key = crypto.randomBytes(32);

// Convert the key to a hexadecimal string for easier storage
const keyHex = key.toString('hex');

console.log('Generated Key (Hex):', keyHex);
