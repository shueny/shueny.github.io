#!/usr/bin/env node

/**
 * Performance Testing Script
 * 
 * This script helps verify that optimizations are working correctly:
 * 1. Checks Service Worker registration
 * 2. Verifies cache headers
 * 3. Analyzes bundle sizes
 * 4. Checks image optimization
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const assetsDir = join(distDir, 'assets');

console.log('🔍 Performance Optimization Test\n');
console.log('=' .repeat(50));

// 1. Check Service Worker
console.log('\n1. Service Worker Check');
const swPath = join(distDir, 'sw.js');
try {
  const swContent = readFileSync(swPath, 'utf-8');
  const hasCacheControl = swContent.includes('Cache-Control');
  const hasImmutable = swContent.includes('immutable');
  const hasAssetsPath = swContent.includes('/assets/');
  
  console.log(`   ✅ Service Worker exists`);
  console.log(`   ${hasCacheControl ? '✅' : '❌'} Cache-Control header injection`);
  console.log(`   ${hasImmutable ? '✅' : '❌'} Immutable cache for hashed files`);
  console.log(`   ${hasAssetsPath ? '✅' : '❌'} /assets/ path recognition`);
} catch (error) {
  console.log(`   ❌ Service Worker not found: ${swPath}`);
}

// 2. Check Bundle Sizes
console.log('\n2. Bundle Size Analysis');
try {
  const jsFiles = readdirSync(assetsDir)
    .filter(f => f.endsWith('.js'))
    .map(f => {
      const filePath = join(assetsDir, f);
      const stats = statSync(filePath);
      return { name: f, size: stats.size };
    })
    .sort((a, b) => b.size - a.size);

  const totalSize = jsFiles.reduce((sum, f) => sum + f.size, 0);
  const largeFiles = jsFiles.filter(f => f.size > 100 * 1024); // > 100KB

  console.log(`   Total JS files: ${jsFiles.length}`);
  console.log(`   Total size: ${(totalSize / 1024).toFixed(2)} KiB`);
  console.log(`   Large files (>100KB): ${largeFiles.length}`);
  
  if (largeFiles.length > 0) {
    console.log('\n   Top 5 largest files:');
    largeFiles.slice(0, 5).forEach((f, i) => {
      const sizeKB = (f.size / 1024).toFixed(2);
      const isReactCore = f.name.includes('react-core');
      const isReactDom = f.name.includes('react-dom');
      const isVendor = f.name.includes('vendor');
      
      let status = '⚠️';
      if (isReactCore || isReactDom) {
        status = '✅'; // Expected to be large
      } else if (isVendor && f.size < 200 * 1024) {
        status = '✅'; // Vendor bundle is reasonable
      }
      
      console.log(`   ${i + 1}. ${status} ${f.name}: ${sizeKB} KiB`);
    });
  }

  // Check for bundle splitting
  const hasReactCore = jsFiles.some(f => f.name.includes('react-core'));
  const hasReactDom = jsFiles.some(f => f.name.includes('react-dom'));
  const hasOldVendor = jsFiles.some(f => f.name.includes('react-vendor') && !f.name.includes('react-core') && !f.name.includes('react-dom'));

  console.log('\n   Bundle Splitting:');
  console.log(`   ${hasReactCore ? '✅' : '❌'} react-core chunk exists`);
  console.log(`   ${hasReactDom ? '✅' : '❌'} react-dom chunk exists`);
  if (hasOldVendor) {
    console.log(`   ⚠️  Old react-vendor chunk still exists (should be split)`);
  }
} catch (error) {
  console.log(`   ❌ Cannot analyze bundles: ${error.message}`);
}

// 3. Check Content Hashing
console.log('\n3. Content Hashing Check');
try {
  const jsFiles = readdirSync(assetsDir)
    .filter(f => f.endsWith('.js'));
  
  const hashedFiles = jsFiles.filter(f => {
    // Check for hash pattern: filename.hash.js
    const match = f.match(/\.([a-f0-9]{8,})\.js$/);
    return match !== null;
  });

  const hashRate = (hashedFiles.length / jsFiles.length * 100).toFixed(1);
  console.log(`   Files with content hash: ${hashedFiles.length}/${jsFiles.length} (${hashRate}%)`);
  
  if (hashRate >= 90) {
    console.log(`   ✅ Good: Most files have content hashing`);
  } else {
    console.log(`   ⚠️  Warning: Some files missing content hashes`);
  }
} catch (error) {
  console.log(`   ❌ Cannot check content hashing: ${error.message}`);
}

// 4. Check HTML for Service Worker registration
console.log('\n4. HTML Service Worker Registration');
try {
  const indexPath = join(distDir, 'index.html');
  if (statSync(indexPath).isFile()) {
    const htmlContent = readFileSync(indexPath, 'utf-8');
    const hasSWRegistration = htmlContent.includes('serviceWorker.register');
    const hasEarlyRegistration = !htmlContent.includes('addEventListener(\'load\'');
    
    console.log(`   ${hasSWRegistration ? '✅' : '❌'} Service Worker registration found`);
    console.log(`   ${hasEarlyRegistration ? '✅' : '⚠️'} Early registration (not waiting for load event)`);
  } else {
    // Check pages directory
    const pagesIndexPath = join(distDir, 'pages', 'index.html');
    if (statSync(pagesIndexPath).isFile()) {
      const htmlContent = readFileSync(pagesIndexPath, 'utf-8');
      const hasSWRegistration = htmlContent.includes('serviceWorker.register');
      console.log(`   ${hasSWRegistration ? '✅' : '❌'} Service Worker registration found in pages/index.html`);
    }
  }
} catch (error) {
  console.log(`   ⚠️  Cannot check HTML: ${error.message}`);
}

// 5. Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 Summary');
console.log('\nNext steps:');
console.log('1. Deploy the updated Service Worker');
console.log('2. Clear browser cache or use incognito mode');
console.log('3. Run Lighthouse test');
console.log('4. Check Network tab for Cache-Control headers');
console.log('5. Verify cache TTL is 1 year for JS/CSS files\n');
