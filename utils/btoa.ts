export default function btoa(str: Buffer | string): string {
  let buffer: Buffer

  if (str instanceof Buffer) {
    buffer = str
  } else {
    buffer = Buffer.from(str.toString(), 'binary')
  }

  return buffer.toString('base64')
}
