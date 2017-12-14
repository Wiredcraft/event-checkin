'use strict';

const faker = require('faker');
const express = require('express');
const env = require('env-var');
const app = express();
var router = express.Router();

const PORT = env('MOCKSERVER_PORT', 4000).asPositiveInt();

router.use((req, res, next) => {
  console.log(`${req.method}\t${req.originalUrl}`);
  next();
});

// fake event data for the next two api endpoints
function eventData() {
  return {
    created: 1505305153000,
    id: '243328174',
    name: 'Hacker News Meetup #13',
    rsvp_limit: faker.random.number(100),
    status: 'past',
    time: 1507741200000,
    local_date: '2017-10-11',
    local_time: '19:00',
    rsvp_open_offset: 'PT346H',
    updated: 1507756196000,
    utc_offset: 7200000,
    waitlist_count: faker.random.number(50),
    yes_rsvp_count: faker.random.number(50),
    venue: {
      id: 25372935,
      name: 'N26',
      lat: 52.51610565185547,
      lon: 13.412334442138672,
      repinned: false,
      address_1: 'Klosterstraße 62, 10179 Berlin',
      city: 'Berlin',
      country: 'de',
      localized_country_name: 'Germany'
    },
    group: {
      created: 1458758826000,
      name: 'Berlin Hacker News Meetup',
      id: 19749103,
      join_mode: 'open',
      lat: 52.52000045776367,
      lon: 13.380000114440918,
      urlname: 'Berlin-Hacker-News-Meetup',
      who: 'Hackers',
      localized_location: 'Berlin, Germany',
      region: 'en_US'
    },
    link: 'https://www.meetup.com/Berlin-Hacker-News-Meetup/events/243328174/',
    description: `<p>
Join us for the 13th edition of Hacker News Meetup at N26. Drinks and food starting at 7 pm,
welcome chat starts at 7:30 pm. RSVP will open at 9:00 am on September 27th.
</p> <p><br/><b>Schedule:</b></p> <p>19:00 - Check-in opens. Pick up a name tag,
grab a beer and some food, and get to know your fellow nerds</p> <p>19:30 - Welcome chat</p>
<p>19:35 - Speaker 1</p> <p>19:50 - Q&amp;A</p> <p>19:55 Short Break</p> <p>20:00 - Speaker 2</p>
<p>20:15 - Q&amp;A</p> <p>20:20 - Enjoy more beer, pizza, and good company</p>
<p>-----------------------------------------------------------------------------------</p>
<p><b>Talks: </b></p> <p><img src=\"https://secure.meetupstatic.com/photos/event/5/3/4/9/600_465081321.jpeg\" /></p>
<p><i>\"Securing Microservices with Kong &amp; Keycloak\" </i>by Stelios Anagnostopoulos, Wiredcraft GmbH. </p>
<p><b>Abstract:</b> Microservices have been taking over monolithic architectures, and it's thus
increasingly important to have robust mechanisms in place to manage and secure components.
In this talk we'll set up a basic microservice environment, demonstrating how to use Kong as the
API gateway to manage components &amp; Keycloak as the authentication suite to secure them.</p>
<p><br/><b>Bio:</b> Stelios joined the Wiredcraft team in Berlin as a Backend Engineer.
He got his Bachelors in Computer Science from Brown University. After college, he moved to Seattle
to work at Microsoft as a Program Manager in the Windows team, before spending some time
in Dubai to help some friends set up a startup.</p>
<p><img src=\"https://secure.meetupstatic.com/photos/event/5/3/5/1/600_465081329.jpeg\" /></p>
<p><i>\"Challenges of choosing SPA framework\"</i>  by Sinisa Grubor, Homeday GmbH.</p>
<p><b>Abstract: </b>We'll take a look at our technical decision-making process for choosing
the framework on our latest project(frontend side). Followed by a short project demo and intro
to Nuxt.js.</p> <p><br/><b>Bio: </b>Sinisa Grubor, a software engineer, working as frontend
team lead @Homeday since February 2017. Before that, I was a frontend engineer @Onefootball
and worked for a software agency, here in Berlin, as full stack developer. </p> <p><br/>
<i>If you are interested in giving a 5-10 minute talk at the meetup send me an email at tijana@wiredcraft.com</i>
</p> <p><i>-----------------------------------------------------------------------------------</i>
</p> <p><i>Join our slack group to chat with attendees before the event and get to know our community -
<a href=\"https://meetup-berlin.wiredcraft.com/\">
<a href=\"https://meetup-berlin.wiredcraft.com/\" class=\"linkified\">https://meetup-berlin.wiredcraft.com/</a>
</a></i></p> <p><i>If you would like to share a job opportunity or are available for work, you can post
this in our job opportunity discussion
<a href=\"http://www.meetup.com/Berlin-Hacker-News-Meetup/messages/boards/thread/49763147\">here</a>. </i></p> `,
    visibility: 'public'
  };
}

router.get('/self/events', (req, res) => {
  res.json([eventData]);
});

router.get('/:groupName/events/:eventID', (req, res) => {
  console.log(req.params);
  res.json(eventData);
});

// fake a rsvp data for the next api endpoint
function rsvpData() {
  return {
    created: 1507230178000,
    updated: 1507277274000,
    response: 'yes',
    guests: faker.random.number(2),
    event: {
      id: '243328174',
      name: 'Hacker News Meetup #13',
      yes_rsvp_count: 48,
      time: 1507741200000,
      utc_offset: 7200000
    },
    group: {
      id: 19749103,
      urlname: 'Berlin-Hacker-News-Meetup',
      name: 'Berlin Hacker News Meetup',
      status: 'active',
      who: 'Hackers',
      members: 1460,
      join_mode: 'open',
      localized_location: 'Berlin, Germany',
      group_photo: {
        id: 463884894,
        highres_link: 'https://secure.meetupstatic.com/photos/event/6/1/3/e/highres_463884894.jpeg',
        photo_link: 'https://secure.meetupstatic.com/photos/event/6/1/3/e/600_463884894.jpeg',
        thumb_link: 'https://secure.meetupstatic.com/photos/event/6/1/3/e/thumb_463884894.jpeg',
        type: 'event',
        base_url: 'https://secure.meetupstatic.com'
      }
    },
    member: {
      id: 196342638,
      name: faker.name.findName(),
      photo: {
        id: 267782754,
        highres_link: 'https://secure.meetupstatic.com/photos/member/a/c/2/highres_267782754.jpeg',
        photo_link: 'https://secure.meetupstatic.com/photos/member/a/c/2/member_267782754.jpeg',
        thumb_link: 'https://secure.meetupstatic.com/photos/member/a/c/2/thumb_267782754.jpeg',
        type: 'member',
        base_url: 'https://secure.meetupstatic.com'
      },
      event_context: {
        host: false
      }
    },
    venue: {
      id: 25372935,
      name: 'N26',
      lat: 52.51610565185547,
      lon: 13.412334442138672,
      repinned: false,
      address_1: 'Klosterstraße 62, 10179 Berlin',
      city: 'Berlin',
      country: 'de',
      localized_country_name: 'Germany'
    }
  };
}

router.get('/:groupName/events/:eventID/rsvps', (req, res) => {
  res.json([
    rsvpData(),
    rsvpData(),
    rsvpData()
  ]);
});

app.use('/', router);
app.listen(PORT, () => console.log(`Mockserver listening on port ${PORT}`));
