const userAgent = process.env.npm_config_user_agent || '';

if (!userAgent.startsWith('pnpm/')) {
  console.error('\n🚫 Use pnpm. Detected: ' + userAgent + '\n');
  process.exit(1);
}
