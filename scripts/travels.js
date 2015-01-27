var mongoose = require('mongoose');
var app = require('../config/app');
var db = require('../config/db');
var request = require('request');
var Promise = require('promise');
var AdventureManager = require('../app/managers/adventure-manager.js');

// trips
var trips = [];

trips.push({
    name: 'Florida Roadtrip',
    startDate: '2009-03-17',
    endDate: '2009-03-21',
    pointsOfInterest: [
        {
            name: 'Serenata Beach Club',
            url: 'http://www.serenataclub.com/'
        }
    ],
    locations: [
        {
            city: 'Savannah',
            region: 'GA',
            country: 'USA',
            countryCode: 'US',
            lat: 32.0405369, 
            lng: -81.2003759
        },
        {
            city: 'St Augustine',
            region: 'FL',
            country: 'USA',
            countryCode: 'US',
            lat: 29.9064859, 
            lng: -81.3052969
        }
    ],
    photosetId: '72157648177042403'
});

trips.push({
    name: 'New York City Trip',
    startDate: '2010-07-04',
    endDate: '2010-07-07',
    pointsOfInterest: [
        {
            name: 'Time Square',
            url: 'http://www.timessquarenyc.org/'
        },
        {
            name: 'Central Park',
            url: 'http://www.centralparknyc.org/'
        },
        {
            name: '21 Club',
            url: 'http://www.21club.com/'
        },
        {
            name: 'Roseland Ballroom',
            url: 'http://en.wikipedia.org/wiki/Roseland_Ballroom'
        },
        {
            name: 'FAO Schwarz',
            url: 'http://www.fao.com/'
        }
    ],
    locations: [
        {
            city: 'New York',
            region: 'NY',
            country: 'USA',
            countryCode: 'US',
            lat: 40.7033121, 
            lng: -73.979681
        }
    ],
    photosetId: '72157648177042433'
});

trips.push({
    name: 'Chicago Roadtrip',
    startDate: '2013-06-27',
    endDate: '2013-07-01',
    pointsOfInterest: [
        {
            name: 'Skydeck',
            url: 'http://theskydeck.com/'
        },
        {
            name: 'Navy Pier',
            url: 'http://navypier.com/'
        },
        {
            name: 'Oak Park',
            url: 'http://www.flwright.org/'
        },
        {
            name: 'Lincoln Park Zoo',
            url: 'http://www.lpzoo.org/'
        },
        {
            name: 'Museum of Science and Industry',
            url: 'http://www.msichicago.org/'
        }
    ],
    locations: [
        {
            city: 'Chicago',
            region: 'IL',
            country: 'USA',
            countryCode: 'US',
            lat: 41.8369, 
            lng: -87.6847
        }
    ],
    photosetId: '72157650416623466'
});

trips.push({
    name: 'North Bay Roadtrip',
    startDate: '2013-08-23',
    endDate: '2013-08-26',
    pointsOfInterest: [
        {
            name: 'Island Cottage',
            url: 'https://www.google.ca/maps/place/46%C2%B018\'05.0%22N+80%C2%B006\'56.9%22W/@46.301382,-80.115802,760m/data=!3m2!1e3!4b1!4m2!3m1!1s0x0:0x0'
        }
    ],
    locations: [
        {
            city: 'North Bay',
            region: 'ON',
            country: 'Canada',
            countryCode: 'CA',
            lat: 46.337588, 
            lng: -79.3805355
        },
        {
            city: 'Lavigne',
            region: 'ON',
            country: 'Canada',
            countryCode: 'CA',
            lat: 46.3265195, 
            lng: -80.170294
        }
    ],
    photosetId: '72157650083641639'
});

trips.push({
    name: 'Finger Lakes Camping',
    startDate: '2014-05-21',
    endDate: '2014-05-24',
    pointsOfInterest: [
        {
            name: 'Robert H Treman State Park',
            url: 'http://nysparks.com/parks/135/details.aspx'
        },
        {
            name: 'Ithaca Beer Co',
            url: 'http://ithacabeer.com/'
        }
    ],
    locations: [
        {
            city: 'Ithaca',
            region: 'NY',
            country: 'USA',
            countryCode: 'US',
            lat: 42.4433, 
            lng: -76.5000
        }
    ],
    photosetId: '72157650435217556'
});

trips.push({
    name: 'Cancun Getaway',
    startDate: '2014-06-07',
    endDate: '2014-06-11',
    pointsOfInterest: [
        {
            name: 'Hotel Riu Palace Las Americas',
            url: 'http://www.tripadvisor.ca/Hotel_Review-g150807-d303140-Reviews-Hotel_Riu_Palace_Las_Americas-Cancun_Yucatan_Peninsula.html'
        }
    ],
    locations: [
        {
            city: 'Cancún',
            country: 'Mexico',
            countryCode: 'MX',
            lat: 21.1606, 
            lng: -87.6847
        }
    ],
    photosetId: '72157649939321591'
});

trips.push({
    name: 'Rattlesnake Point Climbing',
    startDate: '2014-09-20',
    endDate: '2014-09-20',
    pointsOfInterest: [
        {
            name: 'Rattlesnake Point',
            url: 'http://en.wikipedia.org/wiki/Rattlesnake_Point_%28Canada%29'
        }
    ],
    locations: [
        {
            city: 'Milton',
            region: 'ON',
            country: 'Canada',
            countryCode: 'CA',
            lat: 43.5231324, 
            lng: -79.942436
        }
    ],
    photosetId: '72157649574744188'
});

trips.push({
    name: 'Lion\'s Head Camping',
    startDate: '2014-06-21',
    endDate: '2014-06-24',
    pointsOfInterest: [
        {
            name: 'Tobermory',
            url: 'http://tobermory.com/'
        }
    ],
    locations: [
        {
            city: 'Lion\'s Head',
            region: 'ON',
            country: 'Canada',
            countryCode: 'CA',
            lat: 44.96786, 
            lng: -81.2207696
        },
        {
            city: 'Tobermory',
            region: 'ON',
            country: 'Canada',
            countryCode: 'CA',
            lat: 45.254407, 
            lng: -81.6655522
        }
    ],
    photosetId: ''
});

trips.push({
    name: 'Cuba Getaway',
    startDate: '2014-11-06',
    endDate: '2014-11-13',
    pointsOfInterest: [
        {
            name: 'Memories Caribe Beach Resort',
            url: 'http://www.tripadvisor.ca/Hotel_Review-g580450-d2416310-Reviews-Memories_Caribe_Beach_Resort-Cayo_Coco_Jardines_del_Rey_Archipelago_Ciego_de_Avila_Pro.html'
        }
    ],
    locations: [
        {
            city: 'Moron',
            country: 'Cuba',
            countryCode: 'CU',
            lat: 22.108458, 
            lng: -78.627548
        }
    ],
    photosetId: '72157649874337116'
});


function createTrips(trips) {
    if(trips.length == 0) {
        return;
    }
    var trip = trips.shift();
    AdventureManager.saveTrip(trip).then(function() {
        console.log('return');
        createTrips(trips);
    });
}
createTrips(trips);
