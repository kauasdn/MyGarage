const counters = { http_requests_total: {}, http_errors_total: {} };
const histogramBuckets = [50, 100, 200, 500, 1000, 2500, 5000];
const durationSums = {};
const durationCounts = {};

const recordRequest = (method, path, status, durationMs) => {
  const label = `method="${method}",path="${path}",status="${status}"`;

  counters.http_requests_total[label] = (counters.http_requests_total[label] || 0) + 1;

  if (status >= 400) {
    counters.http_errors_total[label] = (counters.http_errors_total[label] || 0) + 1;
  }

  durationSums[label]   = (durationSums[label] || 0) + durationMs;
  durationCounts[label] = (durationCounts[label] || 0) + 1;
};

// Express middleware
const middleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const normPath = req.path.replace(/\/\d+/g, '/:id');
    recordRequest(req.method, normPath, res.statusCode, Date.now() - start);
  });
  next();
};

const handler = (_req, res) => {
  let out = '';

  out += '# HELP http_requests_total Total HTTP requests\n';
  out += '# TYPE http_requests_total counter\n';
  for (const [l, v] of Object.entries(counters.http_requests_total)) {
    out += `http_requests_total{${l}} ${v}\n`;
  }

  out += '# HELP http_errors_total Total HTTP errors (4xx/5xx)\n';
  out += '# TYPE http_errors_total counter\n';
  for (const [l, v] of Object.entries(counters.http_errors_total)) {
    out += `http_errors_total{${l}} ${v}\n`;
  }

  out += '# HELP http_request_duration_avg_ms Average request duration in ms\n';
  out += '# TYPE http_request_duration_avg_ms gauge\n';
  for (const [l, count] of Object.entries(durationCounts)) {
    const avg = (durationSums[l] / count).toFixed(2);
    out += `http_request_duration_avg_ms{${l}} ${avg}\n`;
  }

  out += `# HELP process_uptime_seconds Node.js process uptime\n`;
  out += `# TYPE process_uptime_seconds gauge\n`;
  out += `process_uptime_seconds ${process.uptime().toFixed(2)}\n`;

  res.set('Content-Type', 'text/plain; version=0.0.4');
  res.send(out);
};

module.exports = { middleware, handler, recordRequest };
