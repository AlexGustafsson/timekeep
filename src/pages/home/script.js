export default {
  name: 'home-page',
  data() {
    return {
      timekeepings: [
        {
          id: 0,
          name: 'Skanska',
          time: 12345,
          previous: 45678
        },
        {
          id: 1,
          name: 'Stora Enso',
          time: 12345,
          previous: 456
        },
        {
          id: 2,
          name: 'SAAB',
          time: 12345,
          previous: 45
        }
      ]
    };
  }
};
