export default [
    {
        Header: 'Game',
        id: 'game',
        accessor: d =>
            `${d.game} ${d.max_slots / d.teams}v${d.max_slots / d.teams}`,
        minWidth: 20,
        style: { boxSizing: 'border-box', display: 'flex' }
    },
    {
        Header: 'Description',
        accessor: 'description',
        minWidth: 25
    },
    {
        Header: 'Players',
        id: 'players',
        accessor: d => `${d.filled_slots} / ${d.max_slots}`,
        minWidth: 20
    },
    {
        Header: 'Location',
        accessor: 'yelpLocation.name',
        minWidth: 20,
        style: { boxSizing: 'border-box', display: 'flex' }
    },
    {
        Header: 'City',
        accessor: 'yelpLocation.city',
        minWidth: 20
    },
    {
        Header: 'State',
        accessor: 'yelpLocation.state',
        minWidth: 10
    }
];
