// helper script to get checkin data of an event and
// print out the data formatted as JSON. this script we can use to archive
// the data at early stage of the project

const querystring = require("querystring");
const request = require('request');

if (process.argv.length !== 4) {
  console.log('missing arguments\n');
  console.log('Usage: urlName eventId');
  process.exit(1)
}

const urlName = process.argv[2]
const eventId = process.argv[3]
// console.log("get checkins for", urlName, eventId);

const filter = querystring.escape(JSON.stringify({
  where: {
    urlName: urlName,
    eventId: eventId
  }
}))

let url = 'http://localhost:9000/api/Checkins?filter='+filter

request(url, function (err, res, body) {
  if (err) {
    console.log(err);
    process.exit(1)
  }

  if (res && res.statusCode) {
    let data = JSON.parse(body)
    // console.log('data total:', data.length);
    console.log(JSON.stringify(data, '', '  '));
  }
})
