// const rateLimit = require('express-rate-limit');
// const {logEvents} = require('./Logger');

// const loginLimiter = rateLimit({
//   // Limit the number of requests per IP address
//   windowMs: 60 * 1000, // 1 minute
//   max: 5, // 5 requests per windowMs

//   // Custom message to send when the limit is exceeded
//   message:
//       { message: 'Too many login attempts from this IP , please try again in 60s.'},

//   // Log the events when the limit is exceeded
//   onLimitReached: (req, res, options) => {
//     logEvents.log('warn', `Rate limit exceeded for IP address: ${options.message.message}\t${req.method}\t${req.url}\t${req.header.origin}`, "errlog.log");
//     req.status(options.statusCode).send(options.message)
//   },
//   standardHeaders: true, //Return Rate limit info in the 'RateLimit-*' headers
//   legacyHeaders: false, //Disable `X-RateLimit-*` headers
// });

// module.exports = loginLimiter;

// module.exports = loginLimiter;
