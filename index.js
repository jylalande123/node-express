const server = require("./api/server");

// PORT
const port = process.env.PORT || 3000 // get the value fromthe environment variable PORT OR use 3000
server.listen(port, () => console.log(`Listening on port ${port}...`));
