const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const log = {
      timestamp: new Date().toISOString(),
      method:    req.method,
      path:      req.path,
      status:    res.statusCode,
      duration:  `${Date.now() - start}ms`,
      ip:        req.ip,
    };
    if (res.statusCode >= 400) {
      console.error(JSON.stringify(log));
    } else {
      console.log(JSON.stringify(log));
    }
  });
  next();
};

const errorHandler = (err, req, res, _next) => {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    level:     'error',
    message:   err.message,
    stack:     err.stack,
    path:      req.path,
    method:    req.method,
  }));
  res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor.' });
};

module.exports = { requestLogger, errorHandler };
