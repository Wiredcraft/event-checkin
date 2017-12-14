// helper script to get checkin data of an event and
// print out the data formatted as JSON. this script we can use to archive
// the data at early stage of the project

const querystring = require("querystring");
const request = require('request');

let url = 'http://localhost:9000/api/Checkins'

function usage() {
  console.log('Usage: urlName eventId');
}

console.log(process.argv.length)

switch (process.argv.length) {
  case 2:
  break
  case 4:
    const urlName = process.argv[2]
    const eventId = process.argv[3]
    // get checkins for urlName and eventId
    const filter = querystring.escape(JSON.stringify({
      where: {
        urlName: urlName,
        eventId: eventId
      }
    }))
    url += '?filter='+filter
    break;
  default:
  console.log('missing arguments\n');
    usage()
    process.exit(1)
}

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
