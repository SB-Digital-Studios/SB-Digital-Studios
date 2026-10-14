import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "dist", "client");
const targetDir = path.join(root, "ftp-upload");

async function main() {
  await rm(targetDir, { recursive: true, force: true });
  await mkdir(targetDir, { recursive: true });
  await cp(sourceDir, targetDir, { recursive: true });

  const localMailerConfig = path.join(targetDir, "api", "mailer-config.local.php");
  const deployMailerConfig = path.join(targetDir, "api", "mailer-config.php");

  // Build deploy config from local values when a dedicated deploy config is not present.
  await cp(localMailerConfig, deployMailerConfig, { force: false }).catch(() => undefined);

  // Never deploy workstation-local SMTP credentials to live.
  await rm(localMailerConfig, { force: true });

  console.log(`Prepared FTP bundle: ${targetDir}`);
}

main().catch((error) => {
  console.error("Failed to prepare FTP bundle.");
  console.error(error);
  process.exitCode = 1;
});
