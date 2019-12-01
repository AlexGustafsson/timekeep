import {Card} from '../../components';

export default {
  name: 'home-page',
  data() {
    return {
      timekeepings: [
        {
          id: 0,
          name: 'Skanska',
          time: 5,
          previous: 45678
        },
        {
          id: 1,
          name: 'Bofors',
          time: 100,
          previous: 456
        },
        {
          id: 2,
          name: 'SAAB',
          time: 12345,
          previous: 45
        }
      ],
      activeID: null,
      timer: null
    };
  },
  mounted() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  },
  methods: {
    cardClicked(id) {
      if (id == this.activeID)
        this.activeID = null;
      else
        this.activeID = id;
    },
    tick() {
      if (this.activeID !== null)
        this.timekeepings[this.activeID].time++;
    }
  },
  components: {
    Card
  }
};
