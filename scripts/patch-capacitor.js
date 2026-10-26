import fs from 'node:fs';
import path from 'node:path';

const pluginPath = path.resolve('node_modules/@capacitor/app/ios/Sources/AppPlugin/AppPlugin.swift');
if (fs.existsSync(pluginPath)) {
  let content = fs.readFileSync(pluginPath, 'utf8');
  content = content.replace(/call\.reject\([^)]*\)/g, 'call.unimplemented("Unable to get App Info")');
  fs.writeFileSync(pluginPath, content, 'utf8');
  console.log('[PoopPal] Patched AppPlugin.swift for iOS Capacitor 8.5 compatibility.');
}
