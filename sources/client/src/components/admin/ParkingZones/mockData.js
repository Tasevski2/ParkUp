export const parkingZones = [
    {
        id: 1,
        zoneName: 'Zona 1',
        responsiblePersons: ['Viktor Tasevski', 'David Trajkovski'], // THIS SHOULD BE IN THE ParkingZones Call Only for the Card. For the ZoneInfo We need More Data for The Employees. This should be array of employee objects.
        parkingSpacesNumber: 79,
        takenParkingSpaces: 34,
        hourlyRate: 30,
        workingHours: {
            from: 5,
            to: 24,
        },
        zoneColor: '#FFD700',
        location: {
            center: {
                lat: 42.000389,
                lng: 21.423084,
            },
            coords: [
                { lat: 42.00060867305611, lng: 21.424473984198578 },
                { lat: 42.001509615969574, lng: 21.421609384939654 },
                { lat: 41.99886654813535, lng: 21.42293439620515 },
            ],
        },
        parkingSpaces: [
            {
                lat: '42.00043725326595',
                lng: '21.42263398879119',
                parkingSpaceNumber: 'A21',
                isTaken: true,
            },
            {
                lat: '42.00028576562848',
                lng: '21.423680050318325',
                parkingSpaceNumber: 'A1',
                isTaken: false,
            },
            {
                lat: '41.99959609366812',
                lng: '21.423374278487316',
                parkingSpaceNumber: 'B55',
                isTaken: true,
            },
            {
                lat: '41.99962798617793',
                lng: '21.42275200598912',
                parkingSpaceNumber: 'C20',
                isTaken: false,
            },
        ],
    },
    {
        id: 2,
        zoneName: 'Zona 2',
        responsiblePersons: ['Andrej Tavcioski', 'David Trajkovski'], // THIS SHOULD BE IN THE ParkingZones Call Only for the Card. For the ZoneInfo We need More Data for The Employees. This should be array of employee objects.
        parkingSpacesNumber: 29,
        takenParkingSpaces: 14,
        hourlyRate: 30,
        workingHours: {
            from: 5,
            to: 24,
        },
        zoneColor: '#FF0000',
        location: {
            center: {
                lat: 42.001097017606455,
                lng: 21.421317024169447,
            },
            coords: [
                { lat: 42.00048708466677, lng: 21.42135993951415 },
                { lat: 42.0006784368066, lng: 21.421837372723967 },
                { lat: 42.00149765665009, lng: 21.42148332113017 },
                { lat: 42.00134218508192, lng: 21.42078862898779 },
            ],
        },
        parkingSpaces: [
            {
                lat: '42.00043725326595',
                lng: '21.42263398879119',
                parkingSpaceNumber: 'A21',
                isTaken: true,
            },
            {
                lat: '42.00028576562848',
                lng: '21.423680050318325',
                parkingSpaceNumber: 'A1',
                isTaken: false,
            },
            {
                lat: '41.99959609366812',
                lng: '21.423374278487316',
                parkingSpaceNumber: 'B55',
                isTaken: true,
            },
            {
                lat: '41.99962798617793',
                lng: '21.42275200598912',
                parkingSpaceNumber: 'C20',
                isTaken: false,
            },
        ],
    },
    {
        id: 3,
        zoneName: 'Zona 3',
        responsiblePersons: ['David Trajkovski', 'Kumanovecot'],
        parkingSpacesNumber: 36,
        takenParkingSpaces: 5,
        hourlyRate: 10,
        workingHours: '12:00 - 17:00',
    },
    {
        id: 4,
        zoneName: 'Zona 4',
        responsiblePersons: ['Nekoj od POC'],
        parkingSpacesNumber: 150,
        takenParkingSpaces: 130,
        hourlyRate: 100,
        workingHours: {
            from: '5',
            to: '24',
        },
    },
    {
        id: 5,
        zoneName: 'Zona 5',
        responsiblePersons: [],
        parkingSpacesNumber: 360,
        takenParkingSpaces: 250,
        hourlyRate: 30,
        workingHours: {
            from: '5',
            to: '24',
        },
    },
];
