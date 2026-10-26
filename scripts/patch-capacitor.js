import fs from 'node:fs';
import path from 'node:path';

const pluginPath = path.resolve('node_modules/@capacitor/app/ios/Sources/AppPlugin/AppPlugin.swift');
if (fs.existsSync(pluginPath)) {
  const content = fs.readFileSync(pluginPath, 'utf8');
  const target = 'call.reject("Unable to get App Info")';
  const replacement = 'call.reject("Unable to get App Info", nil, nil, nil)';
  if (content.includes(target)) {
    fs.writeFileSync(pluginPath, content.replace(target, replacement), 'utf8');
    console.log('[PoopPal] Patched AppPlugin.swift for iOS Capacitor 8.5 compatibility.');
  }
}
