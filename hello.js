const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const cacheResponse = (options = undefined) => {
  return async (req, res, next) => {
    // if options is 'undefined' or 'null', we'll assign a new object...
    if (!options) { options = {}; }
    // if req doesn't have context data object, we'll create a new one...
    if (!req.contextData) { req.contextData = {}; }

    // retrieves application state service instance from service factory...
    // const applicationStateService = ServiceFactory.getInstance().getService(ApplicationStateService);
    let responseCacheKey;

    if (typeof options.keyGenerationCallback === 'function') {
      responseCacheKey = await options.keyGenerationCallback({ req, });

      // if 'keyGenerationCallback' function returns false, we shall call the next middleware...
      if (responseCacheKey === false) { return next(); }
    }

    if (!responseCacheKey) { responseCacheKey = req.originalUrl; }

    responseCacheKey = `${RESPONSE_CACHE_KEY_PREFIX}${responseCacheKey}`;

    
    let results;
    try {
        const cacheResults = await redisClient.get(responseCacheKey);
        if (cacheResults) {
            results = JSON.parse(cacheResults);
            res.send({
                fromCache: true,
                data: results,
            });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(404);
    }

  };
};

cacheResponse()