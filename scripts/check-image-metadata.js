const sharp = require("sharp");
const path = require("path");

const base = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "logos",
  "optimized",
);
const files = ["XEMConsultantsLtdLogo.webp", "TNPRS.webp"];

async function run() {
  for (const f of files) {
    const p = path.join(base, f);
    try {
      const meta = await sharp(p).metadata();
      console.log(
        f,
        "-",
        meta.width + "x" + meta.height,
        "format=" + meta.format,
        "space=" + meta.space,
        "channels=" + meta.channels,
      );
    } catch (e) {
      console.error("Error reading", f, e.message);
    }
  }
}

run();
