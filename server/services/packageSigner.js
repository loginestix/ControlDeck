import crypto from 'node:crypto';
import fs from 'node:fs';

const readPrivateKey = () => {
  const keyPath = process.env.PACKAGE_SIGNING_PRIVATE_KEY_PATH;
  if (keyPath && fs.existsSync(keyPath)) return fs.readFileSync(keyPath, 'utf8');
  const inline = process.env.PACKAGE_SIGNING_PRIVATE_KEY_PEM;
  return inline ? inline.replace(/\\n/g, '\n') : null;
};

export async function packageIntegrity(filePath){
  const hash=crypto.createHash('sha256');
  await new Promise((resolve,reject)=>{
    const stream=fs.createReadStream(filePath);
    stream.on('data',chunk=>hash.update(chunk));
    stream.on('end',resolve);
    stream.on('error',reject);
  });
  const sha256=hash.digest('hex');
  const privateKey=readPrivateKey();
  const signature=privateKey?crypto.sign(null,Buffer.from(sha256,'utf8'),privateKey).toString('base64'):null;
  return {sha256,signature,algorithm:signature?'ed25519':null};
}
