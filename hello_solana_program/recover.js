const bs58 = require('bs58');
const fs = require('fs');
b = bs58.decode('9iknZvvSWNHeEvoE7Rwg8XuU5kRYPz1FjDKaUZUZMUNEubx5kxT5LZqNrE5t6Jfmfm8xv6YZxqyChiGFXL6zM5p');
j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
fs.writeFileSync('key.json', `[${j}]`);