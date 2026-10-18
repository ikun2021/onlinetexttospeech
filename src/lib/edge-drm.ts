// Edge TTS v2 DRM Token Generator in pure TypeScript / Node.js
// Based on Microsoft ReadAloud protocol reverse engineering

const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const WIN_EPOCH = BigInt("11644473600");
const S_TO_NS = BigInt(1000000000);
const U32_MASK = 0xffffffff;

const _SHA256_INITIAL: number[] = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
  0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
];

const _SHA256_STATE: number[] = [
  0xfd9fbea2, 0x91243ce7, 0xbe499094, 0xcd2e1e0a,
  0x6c006f49, 0x04bd35ab, 0xfeb0a7e4, 0x03effbd2,
];

const _SHA256_SCHEDULE: number[] = [
  0xeb24bf9e, 0x1558691f, 0xa0c09ee2, 0x0cfa32ba,
  0xa622ee8c, 0xd1dd9491, 0xc0dd25a0, 0xf9e70ab6,
  0xf0c31573, 0x7058ce4e, 0x7188e606, 0x00e5ab33,
  0xd258b060, 0x72766564,
];

const _SHA256_ROUND_CONSTANTS: number[] = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

const _SHA256_ADJUSTMENT = 0xc9dc06a7;
const _SHA256_BLOCK_CONSTANTS: number[] = [
  ..._SHA256_ROUND_CONSTANTS.slice(0, 14),
  _SHA256_ADJUSTMENT,
  ..._SHA256_ROUND_CONSTANTS.slice(15),
];

const _SHA256_SIGMA0_ADJUSTMENT = 0x059c0b80;
const _SHA256_SIGMA1_ADJUSTMENT = 0x000b92c0;

const _CS64_COEFFICIENTS: [number, number][] = [
  [0xe82e91b1, 0xb32700d0],
  [0x44de24c6, 0x88dff51d],
  [0x3beb65bc, 0x29514038],
  [0xc89c5933, 0xb328cbdf],
  [0x8d1ec211, 0xd405b4d5],
  [0x314ef5d5, 0x26e55f3c],
  [0xe92491b1, 0x607801c6],
  [0xf0a5b9d5, 0x82b2c1fb],
  [0x06064cf3, 0xfa51a3da],
  [0xda79fa60, 0x207cc464],
  [0xbed20560, 0x3c3c74f3],
  [0x89f9c9f8, 0xd2d14b61],
  [0x35fa38c6, 0xbb04a2c1],
  [0xcb49e3c6, 0xc5626167],
];

const _CS64_FACTOR = 0x82893933;
const _CS64_ADJUSTMENT0 = 0xf2f90b1a;
const _CS64_ADJUSTMENT1 = 0x0b1a0000;

const B_MUL = BigInt("0x100000001");
const B_MASK = BigInt(U32_MASK);

function u32(v: number | bigint): number {
  return Number(BigInt(v) & B_MASK);
}

function _rol16(value: number): number {
  const v = u32(value);
  return u32((v << 16) | (v >>> 16));
}

function _words_le4_even(data: Buffer): number[] {
  const rem = (-data.length) % 4;
  const padLen = rem < 0 ? rem + 4 : rem;
  const padded = Buffer.concat([data, Buffer.alloc(padLen)]);
  if (padded.length === 0) return [];

  const words: number[] = [];
  for (let i = 0; i < padded.length; i += 4) {
    words.push(padded.readUInt32LE(i));
  }
  if (words.length % 2 !== 0) {
    words.push(0);
  }
  return words;
}

function _sigma0(value: number): number {
  const v = u32(value);
  return u32((v >>> 7) ^ (v << 25) ^ (v >>> 18) ^ (v << 14) ^ (v >>> 3));
}

function _sigma1(value: number): number {
  const v = u32(value);
  return u32((v >>> 17) ^ (v << 15) ^ (v >>> 19) ^ (v << 13) ^ (v >>> 10));
}

function _sha256_rounds(state: number[], words: number[], first_round = 0): number[] {
  let [a, b, c, d, e, f, g, h] = state;
  const constants = first_round === 14 ? _SHA256_BLOCK_CONSTANTS : _SHA256_ROUND_CONSTANTS;

  const aligned = Math.min(64, Math.floor((first_round + 7) / 8) * 8);
  for (let index = first_round; index < aligned; index++) {
    const rot_e = BigInt(u32(e)) * B_MUL;
    const rot_a = BigInt(u32(a)) * B_MUL;

    const t1 = u32(
      BigInt(u32(h)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(g ^ (e & (f ^ g)))) +
      BigInt(u32(constants[index])) +
      BigInt(u32(words[index]))
    );
    const t2 = u32(
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((a & b) | (c & (a | b))))
    );
    [a, b, c, d, e, f, g, h] = [u32(t1 + t2), a, b, c, u32(d + t1), e, f, g];
  }

  for (let index = aligned; index < 64; index += 8) {
    let rot_e = BigInt(u32(e)) * B_MUL;
    let rot_a = BigInt(u32(a)) * B_MUL;
    let t1 = u32(
      BigInt(u32(h)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(g ^ (e & (f ^ g)))) +
      BigInt(u32(constants[index])) +
      BigInt(u32(words[index]))
    );
    d = u32(d + t1);
    h = u32(
      BigInt(t1) +
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((a & b) | (c & (a | b))))
    );

    rot_e = BigInt(u32(d)) * B_MUL;
    rot_a = BigInt(u32(h)) * B_MUL;
    t1 = u32(
      BigInt(u32(g)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(f ^ (d & (e ^ f)))) +
      BigInt(u32(constants[index + 1])) +
      BigInt(u32(words[index + 1]))
    );
    c = u32(c + t1);
    g = u32(
      BigInt(t1) +
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((h & a) | (b & (h | a))))
    );

    rot_e = BigInt(u32(c)) * B_MUL;
    rot_a = BigInt(u32(g)) * B_MUL;
    t1 = u32(
      BigInt(u32(f)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(e ^ (c & (d ^ e)))) +
      BigInt(u32(constants[index + 2])) +
      BigInt(u32(words[index + 2]))
    );
    b = u32(b + t1);
    f = u32(
      BigInt(t1) +
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((g & h) | (a & (g | h))))
    );

    rot_e = BigInt(u32(b)) * B_MUL;
    rot_a = BigInt(u32(f)) * B_MUL;
    t1 = u32(
      BigInt(u32(e)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(d ^ (b & (c ^ d)))) +
      BigInt(u32(constants[index + 3])) +
      BigInt(u32(words[index + 3]))
    );
    a = u32(a + t1);
    e = u32(
      BigInt(t1) +
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((f & g) | (h & (f | g))))
    );

    rot_e = BigInt(u32(a)) * B_MUL;
    rot_a = BigInt(u32(e)) * B_MUL;
    t1 = u32(
      BigInt(u32(d)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(c ^ (a & (b ^ c)))) +
      BigInt(u32(constants[index + 4])) +
      BigInt(u32(words[index + 4]))
    );
    h = u32(h + t1);
    d = u32(
      BigInt(t1) +
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((e & f) | (g & (e | f))))
    );

    rot_e = BigInt(u32(h)) * B_MUL;
    rot_a = BigInt(u32(d)) * B_MUL;
    t1 = u32(
      BigInt(u32(c)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(b ^ (h & (a ^ b)))) +
      BigInt(u32(constants[index + 5])) +
      BigInt(u32(words[index + 5]))
    );
    g = u32(g + t1);
    c = u32(
      BigInt(t1) +
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((d & e) | (f & (d | e))))
    );

    rot_e = BigInt(u32(g)) * B_MUL;
    rot_a = BigInt(u32(c)) * B_MUL;
    t1 = u32(
      BigInt(u32(b)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(a ^ (g & (h ^ a)))) +
      BigInt(u32(constants[index + 6])) +
      BigInt(u32(words[index + 6]))
    );
    f = u32(f + t1);
    b = u32(
      BigInt(t1) +
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((c & d) | (e & (c | d))))
    );

    rot_e = BigInt(u32(f)) * B_MUL;
    rot_a = BigInt(u32(b)) * B_MUL;
    t1 = u32(
      BigInt(u32(a)) +
      ((rot_e >> BigInt(6)) ^ (rot_e >> BigInt(11)) ^ (rot_e >> BigInt(25))) +
      BigInt(u32(h ^ (f & (g ^ h)))) +
      BigInt(u32(constants[index + 7])) +
      BigInt(u32(words[index + 7]))
    );
    e = u32(e + t1);
    a = u32(
      BigInt(t1) +
      ((rot_a >> BigInt(2)) ^ (rot_a >> BigInt(13)) ^ (rot_a >> BigInt(22))) +
      BigInt(u32((b & c) | (d & (b | c))))
    );
  }

  return [a, b, c, d, e, f, g, h];
}

function _expand_sha256_schedule(words: number[], first_word = 16): void {
  for (let index = first_word; index < 64; index++) {
    const x = words[index - 2];
    const y = words[index - 15];
    const sigma1 = u32((x >>> 17) ^ (x << 15) ^ (x >>> 19) ^ (x << 13) ^ (x >>> 10));
    const sigma0 = u32((y >>> 7) ^ (y << 25) ^ (y >>> 18) ^ (y << 14) ^ (y >>> 3));
    words.push(u32(BigInt(sigma1) + BigInt(words[index - 7]) + BigInt(sigma0) + BigInt(words[index - 16])));
  }
}

function _sha256_init(data: Buffer): number[] {
  const words: number[] = new Array(14).fill(0);
  const w14 = (data[0] << 16) | (data[1] << 8) | data[2];
  const w15 = data.readUInt32BE(3);
  words.push(u32(w14));
  words.push(u32(w15));

  for (let index = 16; index < 30; index++) {
    let value = _SHA256_SCHEDULE[index - 16];
    if (index - 2 >= 14) {
      value += index === 16
        ? (_sigma1(words[index - 2]) ^ _SHA256_SIGMA1_ADJUSTMENT)
        : _sigma1(words[index - 2]);
    }
    if (index - 7 >= 14) {
      value += words[index - 7];
    }
    if (index - 15 >= 14) {
      value += index === 29
        ? (_sigma0(words[index - 15]) ^ _SHA256_SIGMA0_ADJUSTMENT)
        : _sigma0(words[index - 15]);
    }
    words.push(u32(value));
  }

  words.push(u32(
    BigInt(_sigma1(words[28])) +
    BigInt(words[23]) +
    BigInt(_sigma0(words[15])) +
    BigInt(words[14]) +
    BigInt(_SHA256_ADJUSTMENT) -
    BigInt(_SHA256_ROUND_CONSTANTS[14])
  ));

  _expand_sha256_schedule(words, 31);
  const working = _sha256_rounds(_SHA256_STATE, words, 14);
  return _SHA256_INITIAL.map((x, i) => u32(x + working[i]));
}

function _sha256_digest(data: Buffer): Buffer {
  if (data.length < 7) {
    throw new Error("Token salt must contain at least seven bytes");
  }
  const length = 57 + data.length;
  const rem = (55 - length) % 64;
  const padZeros = rem < 0 ? rem + 64 : rem;

  const bLen = Buffer.alloc(8);
  bLen.writeBigUInt64BE(BigInt(length * 8));

  const padded = Buffer.concat([
    data.subarray(7),
    Buffer.from([0x80]),
    Buffer.alloc(padZeros),
    bLen,
  ]);

  let state = _sha256_init(data.subarray(0, 7));
  for (let offset = 0; offset < padded.length; offset += 64) {
    const chunk = padded.subarray(offset, offset + 64);
    const words: number[] = [];
    for (let i = 0; i < 64; i += 4) {
      words.push(chunk.readUInt32BE(i));
    }
    _expand_sha256_schedule(words);
    const working = _sha256_rounds(state, words);
    state = state.map((x, i) => u32(x + working[i]));
  }

  const out = Buffer.alloc(32);
  for (let i = 0; i < 8; i++) {
    out.writeUInt32BE(state[i], i * 4);
  }
  return out;
}

function _cs64_digest(data: Buffer, digest: Buffer): [number, number] {
  let key_a = digest.readUInt32LE(0) | 1;
  let key_b = digest.readUInt32LE(4) | 1;
  key_a = u32(key_a);
  key_b = u32(key_b);

  const factors: [number, number] = [
    u32(BigInt(key_a) * BigInt(_CS64_FACTOR)),
    u32(BigInt(key_b) * BigInt(_CS64_FACTOR)),
  ];

  const terms: number[] = _CS64_COEFFICIENTS.map(([coeff], idx) =>
    u32(BigInt(coeff) * BigInt(factors[idx % 2]))
  );
  const offsets: number[] = _CS64_COEFFICIENTS.map(([, off]) => off);

  const zeroPaddedData = Buffer.concat([Buffer.from([0x00]), data]);
  const words = _words_le4_even(zeroPaddedData);

  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    let term = BigInt(word) * BigInt(index % 2 === 0 ? key_a : key_b);
    let offset = BigInt(_rol16(word)) * BigInt(index % 2 === 0 ? 0xef0569fb : 0xc31713db);
    if (index === 0) {
      term += BigInt(_CS64_ADJUSTMENT0) * BigInt(factors[0]);
      offset += BigInt(_CS64_ADJUSTMENT1);
    }
    terms.push(u32(term));
    offsets.push(u32(offset));
  }

  let swap_acc = BigInt(0);
  let swap_last = BigInt(0);
  let state = BigInt(0);
  let acc = BigInt(0);

  const B_76F5 = BigInt("0x76f50f34");
  const B_C3EF = BigInt("0xc3efea97");
  const B_1881 = BigInt("0x1881ce3c");
  const B_35BD = BigInt("0x35bd1ec9");
  const B_CF98 = BigInt("0xcf98b111");
  const B_8708 = BigInt("0x87085b9f");
  const B_12CE = BigInt("0x12ceb96d");
  const B_257E = BigInt("0x257e1d83");
  const B_A274 = BigInt("0xa27416f5");
  const B_D383 = BigInt("0xd38396ff");
  const B_7C93 = BigInt("0x7c932b89");
  const B_BFA4 = BigInt("0xbfa49f69");

  for (let index = 0; index < terms.length; index += 2) {
    const x = BigInt(terms[index]);
    const y = BigInt(terms[index + 1]);

    let t = BigInt(_rol16(u32(BigInt(offsets[index]) + x)));
    let q = BigInt(u32(t * B_76F5));
    swap_acc = BigInt(u32(swap_acc + BigInt(_rol16(Number(q))) * B_C3EF + q));

    t = BigInt(_rol16(u32(BigInt(offsets[index + 1]) + y)));
    q = BigInt(u32(t * B_1881));
    swap_last = BigInt(u32(BigInt(_rol16(Number(q))) * B_35BD + q));
    swap_acc = BigInt(u32(swap_acc + swap_last));

    state = BigInt(u32(state * BigInt(key_a) + x));
    state = BigInt(u32(BigInt(_rol16(Number(state))) * B_CF98));
    state = BigInt(u32(BigInt(_rol16(Number(state))) * B_8708));
    state = BigInt(u32(BigInt(_rol16(Number(state))) * B_12CE));
    state = BigInt(u32(BigInt(_rol16(Number(state))) * B_257E));
    acc = BigInt(u32(acc + state));

    t = BigInt(u32(state * BigInt(key_b) + y));
    t = BigInt(u32(BigInt(_rol16(Number(t))) * B_A274));
    t = BigInt(u32(BigInt(_rol16(Number(t))) * B_D383));
    state = BigInt(u32(BigInt(_rol16(u32(BigInt(_rol16(Number(t))) * B_7C93))) * B_BFA4));
    acc = BigInt(u32(acc + state));
  }

  return [
    u32(swap_last ^ state),
    u32(swap_acc ^ acc),
  ];
}

let cachedTimestamp = 0;
let cachedToken = "";

export function generateSecMsGecV2(unixTimestamp?: number): string {
  const now = unixTimestamp ?? Math.floor(Date.now() / 1000);
  let ticks = BigInt(now) + WIN_EPOCH;
  ticks -= ticks % BigInt(300);
  const roundedUnix = Number(ticks - WIN_EPOCH);

  if (cachedToken && cachedTimestamp === roundedUnix) {
    return cachedToken;
  }

  ticks *= S_TO_NS / BigInt(100);
  const strToHash = Buffer.from(`${ticks.toString()}${TRUSTED_CLIENT_TOKEN}`, "ascii");
  const digest = _sha256_digest(strToHash);
  const [cs0, cs1] = _cs64_digest(strToHash, digest);

  const csBuf = Buffer.alloc(8);
  csBuf.writeUInt32LE(cs0, 0);
  csBuf.writeUInt32LE(cs1, 4);
  const cs64Hex = csBuf.toString("hex").toUpperCase();
  const sha256Hex = digest.toString("hex").toUpperCase();

  cachedTimestamp = roundedUnix;
  cachedToken = `${cs64Hex}-${sha256Hex}`;
  return cachedToken;
}

export function generateMuid(): string {
  const crypto = require("crypto");
  return crypto.randomBytes(16).toString("hex").toUpperCase();
}
