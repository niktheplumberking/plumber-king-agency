<?php
// Lead form handler for Hostinger (PHP). Emails each enquiry to the address below and answers with JSON.
// Source of the address: Nick, 2026-10-16 (business inbox). Only POSTed JSON from this site's own forms is accepted.
declare(strict_types=1);

const LEAD_TO = 'nick@plumberkingagency.com';
const MAX_LEN = 300;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function done(int $code, array $body): void { http_response_code($code); echo json_encode($body); exit; }

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') done(405, ['ok' => false, 'error' => 'method']);

// Same-site only: browsers send Origin on fetch POSTs; reject other sites posting into the form.
$host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '') ?? ''); // without the port
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) done(403, ['ok' => false, 'error' => 'origin']);

$raw = file_get_contents('php://input', false, null, 0, 10000);
$in = json_decode($raw ?: '', true);
if (!is_array($in)) done(400, ['ok' => false, 'error' => 'json']);
if (!empty($in['company_website_hp'])) done(200, ['ok' => true]); // honeypot: pretend success to bots

// Plain text only: strip control characters (stops header injection) and cap each field.
$clean = static function ($v): string {
  $v = is_scalar($v) ? (string) $v : '';
  $v = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $v) ?? '';
  return mb_substr(trim($v), 0, MAX_LEN);
};
$f = [];
foreach (['name', 'business', 'email', 'phone', 'website', 'kind', 'page', 'submittedAt'] as $k) $f[$k] = $clean($in[$k] ?? '');

if ($f['name'] === '' || $f['business'] === '' || $f['phone'] === '') done(422, ['ok' => false, 'error' => 'missing']);
if (!filter_var($f['email'], FILTER_VALIDATE_EMAIL)) done(422, ['ok' => false, 'error' => 'email']);
if (!in_array($f['kind'], ['strategy-call', 'website-audit'], true)) $f['kind'] = 'strategy-call';

$subject = ($f['kind'] === 'website-audit' ? 'Free website audit request' : 'Strategy call request') . ': ' . $f['business'];
$lines = [];
foreach ($f as $k => $v) $lines[] = str_pad($k . ':', 13) . $v;
$lines[] = str_pad('ip:', 13) . ($_SERVER['REMOTE_ADDR'] ?? '');
$body = "New lead from the Plumber King Agency website\n\n" . implode("\n", $lines) . "\n";

$fromHost = preg_replace('/^www\./', '', preg_replace('/[^a-z0-9.-]/', '', $host)) ?: 'localhost';
$headers = implode("\r\n", [
  'From: Plumber King Agency website <no-reply@' . $fromHost . '>',
  'Reply-To: ' . $f['email'],
  'Content-Type: text/plain; charset=UTF-8',
]);

$sent = mail(LEAD_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
done($sent ? 200 : 502, ['ok' => $sent]);
