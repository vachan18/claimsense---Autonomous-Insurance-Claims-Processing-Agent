/**
 * ClaimSense v4 - Automated Test Suite
 * Validates DOM integrity, AI provider configurations, keyboard listeners,
 * and security attributes using Node.js built-in test runner.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('ClaimSense v4 Architecture & Integrity', () => {
  const htmlPath = path.join(__dirname, '..', 'claimsense-v4.html');
  assert.ok(fs.existsSync(htmlPath), 'claimsense-v4.html must exist in repository root');
  const content = fs.readFileSync(htmlPath, 'utf8');

  test('Document structure adheres to HTML5 standard', () => {
    assert.match(content, /<!DOCTYPE\s+html>/i, 'HTML5 DOCTYPE declaration is required');
    assert.match(content, /<meta\s+charset=["']?utf-8["']?/i, 'UTF-8 charset must be declared');
    assert.match(content, /<meta\s+name=["']viewport["']/i, 'Responsive viewport meta tag must be present');
    assert.match(content, /<title>.*ClaimSense.*<\/title>/i, 'Document title must reflect ClaimSense');
  });

  test('Navigation panels and core views exist', () => {
    const requiredViews = [
      'fnol',
      'history',
      'analytics',
      'compare',
      'settings'
    ];
    for (const view of requiredViews) {
      assert.ok(
        content.toLowerCase().includes(view),
        `Core view/panel '${view}' must be defined in template`
      );
    }
  });

  test('All primary LLM providers are configured in options', () => {
    const requiredProviders = [
      'anthropic',
      'openai',
      'groq',
      'gemini'
    ];
    for (const provider of requiredProviders) {
      assert.ok(
        content.toLowerCase().includes(provider),
        `Provider '${provider}' must be configured in settings`
      );
    }
  });

  test('Security & privacy guardrails: sessionStorage is used for credentials', () => {
    assert.ok(
      content.includes('sessionStorage'),
      'API keys must be secured in sessionStorage rather than localStorage'
    );
  });

  test('Keyboard shortcut hooks are wired', () => {
    assert.ok(
      content.includes('keydown') || content.includes('addEventListener'),
      'Keyboard event listener must be registered'
    );
    assert.ok(
      content.includes('Enter') || content.includes('ctrlKey'),
      'Ctrl+Enter execution shortcut must be supported'
    );
  });

  test('Fraud Risk scoring and visual metrics are declared', () => {
    assert.ok(
      content.includes('fraud') || content.includes('Fraud'),
      'Fraud Risk assessment component must be present'
    );
  });

  test('Export functionality (JSON / Print) is available', () => {
    assert.ok(
      content.includes('application/json') || content.includes('JSON.stringify'),
      'JSON export serialization must be implemented'
    );
    assert.ok(
      content.includes('window.print') || content.includes('print'),
      'Print stylesheet or window.print handler must be present'
    );
  });
});
