var gamesData = [
    // gamesData is a table
    {
        id: 1, // id serial primary key
        game: 'Basketball', // varchar(100) not null
        teams: 2, // smallint not null
        description: 'Come through!', // varchar(100)
        filled_slots: 5, // smallint default 0
        max_slots: 6, // smallint not null
        yelpLocation: {
            id: 'hBcxYewDI9UHX39cpEnLBQ',
            name: 'Cherry Park',
            address: '909 Kiely Blvd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media2.fl.yelpcdn.com/bphoto/UzsYZefAZp7rgOVhyq-WDQ/o.jpg',
            coordinates: {
                latitude: 37.3421478271484,
                longitude: -121.974380493164
            }
        },
        active: true,
        lobby_leader: 'viet',
        eventDate: new Date(),
        current_players: {
            team1: ['ken', null, 'cathie'],
            team2: ['long', 'jesse', 'duc']
        }
    },
    {
        id: 2,
        game: 'Basketball',
        teams: 2,
        description: "It's lit, run it back.",
        filled_slots: 2,
        max_slots: 10,
        yelpLocation: {
            id: 'hBcxYewDI9UHX39cpEnLBQ',
            name: 'Cherry Park',
            address: '909 Kiely Blvd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media2.fl.yelpcdn.com/bphoto/UzsYZefAZp7rgOVhyq-WDQ/o.jpg',
            coordinates: {
                latitude: 37.3421478271484,
                longitude: -121.974380493164
            }
        },
        active: true,
        lobby_leader: 'long',
        eventDate: new Date(),
        current_players: {
            team1: ['ken', null, null, null, null],
            team2: ['long', null, null, null, null]
        }
    },
    {
        id: 3,
        game: 'Catan',
        teams: 2,
        description: 'Lets Play!',
        filled_slots: 2,
        max_slots: 4,
        yelpLocation: {
            id: 'hBcxYewDI9UHX39cpEnLBQ',
            name: 'Cherry Park',
            address: '909 Kiely Blvd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media2.fl.yelpcdn.com/bphoto/UzsYZefAZp7rgOVhyq-WDQ/o.jpg',
            coordinates: {
                latitude: 37.3421478271484,
                longitude: -121.974380493164
            }
        },
        active: true,
        lobby_leader: 'test',
        eventDate: new Date(),
        current_players: {
            team1: ['cathie', null],
            team2: ['test', null]
        }
    },
    {
        id: 4,
        game: 'Soccer',
        teams: 2,
        description: 'Play our team',
        filled_slots: 6,
        max_slots: 12,
        yelpLocation: {
            id: 'hBcxYewDI9UHX39cpEnLBQ',
            name: 'Central Park',
            address: '909 Kiely Blvd',
            city: 'Santa Clara',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media2.fl.yelpcdn.com/bphoto/UzsYZefAZp7rgOVhyq-WDQ/o.jpg',
            coordinates: {
                latitude: 37.3421478271484,
                longitude: -121.974380493164
            }
        },
        active: true,
        lobby_leader: 'ken',
        eventDate: new Date(),
        current_players: {
            team1: ['ken', 'cathie', 'duc', null, null, null],
            team2: ['long', 'viet', 'jesse', null, null, null]
        }
    },
    {
        id: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 4,
        max_slots: 6,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: true,
        lobby_leader: 'duc',
        eventDate: new Date(),
        current_players: {
            team1: ['ken', 'duc', null],
            team2: ['long', 'viet', null]
        }
    },
    {
        id: '1inactive',
        game: 'Soccer',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 4,
        max_slots: 6,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'duc',
        eventDate: new Date(2018, 9, 29),
        current_players: {
            team1: ['ken', 'duc', null],
            team2: ['long', 'viet', null]
        }
    },
    {
        id: '2inactive',
        game: 'Basketball',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 4,
        max_slots: 6,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'duc',
        eventDate: new Date(2018, 10, 2),
        current_players: {
            team1: ['ken', 'duc', null],
            team2: ['long', 'viet', null]
        }
    },
    {
        id: '3inactive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: 'sdfdfasdfsd',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: 'sadfdsfsadfsadfs',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inafghfghfdghfctive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inacshgffsjytitive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inacttybrunu6iive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inbwytrntytactive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3irtimoynactive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inactitiymtioiupve',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inactqvtbrrtyive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inactnyvrcetive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3incwtverwntitactive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3wecterytuyuiinactive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inacintityburtvtive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inqcwerewbturactive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3iqcrtevybyrutynactive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    },
    {
        id: '3inaeytnytuiyjctive',
        game: 'Sequence',
        teams: 2,
        description: 'Boba and sequence tourny',
        filled_slots: 3,
        max_slots: 4,
        yelpLocation: {
            id: 'YnxCCpifPOHg0YHp-oIE0A',
            name: 'Tea Lyfe',
            address: '989 Story Rd',
            city: 'San Jose',
            state: 'CA',
            url:
                'https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg',
            image_url:
                'https://s3-media3.fl.yelpcdn.com/bphoto/bR7gpbm8Pf2rcc-3npghbg/o.jpg',
            coordinates: {
                latitude: 37.3323443189417,
                longitude: -121.857742217231
            }
        },
        active: false,
        lobby_leader: 'cathie',
        eventDate: new Date(2018, 10, 5),
        current_players: {
            team1: ['ken', 'cathie', null],
            team2: [null, 'viet', null]
        }
    }
];

var login = [
    {
        id: 1,
        username: 'ken',
        password_hash: 'ken'
    },
    {
        id: 2,
        username: 'duc',
        password_hash: 'duc'
    },
    {
        id: 3,
        username: 'viet',
        password_hash: 'viet'
    },
    {
        id: 4,
        username: 'cathie',
        password_hash: 'cathie'
    },
    {
        id: 5,
        username: 'long',
        password_hash: 'long'
    },
    {
        id: 6,
        username: 'jesse',
        password_hash: 'jesse'
    },
    {
        id: 7,
        username: 'test',
        password_hash: 'test'
    }
];
var users2 = new Map();
users2.set('ken', {
    id: 1,
    username: 'ken',
    email: 'ken@gmail.com',
    firstName: 'ken',
    lastName: 'quan',
    city: 'San Jose',
    state: 'CA',
    gender: 'male',
    joined: new Date(2015, 5, 14),
    chats: [],
    instagram: 'kayqq',
    matchHistory: [1, 2, 4, 5] // array of match id reference
});
users2.set('duc', {
    id: 2,
    username: 'duc',
    email: 'duc@gmail.com',
    firstName: 'duc',
    lastName: 'phan',
    city: 'San Jose',
    state: 'CA',
    gender: 'male',
    joined: new Date(2013, 7, 20),
    chats: [],
    instagram: 'ducvphan',
    matchHistory: [1, 4, 5]
});
users2.set('viet', {
    id: 3,
    username: 'viet',
    email: 'viet@gmail.com',
    firstName: 'viet',
    lastName: 'le',
    city: 'San Jose',
    state: 'CA',
    gender: 'male',
    joined: new Date(2012, 5, 13),
    chats: [],
    instagram: 'kuon9',
    matchHistory: [1, 4, 5]
});
users2.set('cathie', {
    id: 4,
    username: 'cathie',
    email: 'cathie@gmail.com',
    firstName: 'cathie',
    lastName: 'pham',
    city: 'San Jose',
    state: 'CA',
    gender: 'female',
    joined: new Date(2017, 3, 6),
    chats: [],
    instagram: 'cathiikins',
    matchHistory: [1, 3, 4]
});
users2.set('long', {
    id: 5,
    username: 'long',
    email: 'long@gmail.com',
    firstName: 'long',
    lastName: 'hoang',
    city: 'San Jose',
    state: 'CA',
    gender: 'male',
    joined: new Date(2018, 6, 16),
    chats: [],
    instagram: 'longphihoang',
    matchHistory: [1, 2, 4, 5]
});
users2.set('jesse', {
    id: 6,
    username: 'jesse',
    email: 'jesse@gmail.com',
    firstName: 'jesse',
    lastName: 'hoang',
    city: 'San Jose',
    state: 'CA',
    gender: 'male',
    joined: new Date(2016, 4, 24),
    chats: [],
    instagram: 'jlhoang',
    matchHistory: [1, 4]
});
users2.set('test', {
    id: 7,
    username: 'test',
    email: 'test@gmail.com',
    firstName: 'test',
    lastName: 'tester',
    city: 'San Jose',
    state: 'CA',
    gender: 'male',
    joined: new Date(2017, 8, 5),
    chats: [],
    instagram: 'testies',
    matchHistory: [2]
});

// CHANGE USERS DB TO MAP

var users = [
    // users is a table
    {
        id: 1,
        username: 'ken',
        email: 'ken@gmail.com',
        firstName: 'ken',
        lastName: 'quan',
        city: 'San Jose',
        state: 'CA',
        gender: 'male',
        socketId: null,
        messages: {},
        instagram: 'kayqq',
        matchHistory: [1, 2, 4, 5] // array of match id reference
    },
    {
        id: 2,
        username: 'duc',
        email: 'duc@gmail.com',
        firstName: 'duc',
        lastName: 'phan',
        city: 'San Jose',
        state: 'CA',
        gender: 'male',
        socketId: null,
        instagram: 'ducvphan',
        matchHistory: [1, 4, 5]
    },
    {
        id: 3,
        username: 'viet',
        email: 'viet@gmail.com',
        firstName: 'viet',
        lastName: 'le',
        city: 'San Jose',
        state: 'CA',
        gender: 'male',
        socketId: null,
        instagram: 'kuon9',
        matchHistory: [1, 4, 5]
    },
    {
        id: 4,
        username: 'cathie',
        email: 'cathie@gmail.com',
        firstName: 'cathie',
        lastName: 'pham',
        city: 'San Jose',
        state: 'CA',
        gender: 'female',
        socketId: null,
        messages: {},
        instagram: 'cathiikins',
        matchHistory: [1, 3, 4]
    },
    {
        id: 5,
        username: 'long',
        email: 'long@gmail.com',
        firstName: 'long',
        lastName: 'hoang',
        city: 'San Jose',
        state: 'CA',
        gender: 'male',
        socketId: null,
        instagram: 'longphihoang',
        matchHistory: [1, 2, 4, 5]
    },
    {
        id: 6,
        username: 'jesse',
        email: 'jesse@gmail.com',
        firstName: 'jesse',
        lastName: 'hoang',
        city: 'San Jose',
        state: 'CA',
        gender: 'male',
        socketId: null,
        instagram: 'jlhoang',
        matchHistory: [1, 4]
    },
    {
        id: 7,
        username: 'test',
        email: 'test@gmail.com',
        firstName: 'test',
        lastName: 'tester',
        city: 'San Jose',
        state: 'CA',
        gender: 'male',
        socketId: null,
        instagram: 'testies',
        matchHistory: [2]
    }
];

var chats = [];

var messages = [];

// var messages = [
//     {
//         id: '1',
//         roomID: '1',
//         message: 'Hello',
//         sender: 'ken',
//         time: '2:30PM 9-27-18'
//     }
// ]

module.exports = {
    gamesData,
    login,
    users,
    users2,
    chats,
    messages
};
