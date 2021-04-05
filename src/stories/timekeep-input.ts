import TimekeepInput from "../components/timekeep-input.vue";
import IonSearch from "../components/ion-icons/search.vue";
import {ref} from "vue";

export default {
  title: "Components/Timekeep Input",
  component: TimekeepInput,
};

const Template = () => ({
  components: { TimekeepInput, IonSearch },
  template: `
    <timekeep-input v-model="text" placeholder="Filter by project, groups and tags">
      <template v-slot:icon><ion-search /></template>
      <template v-slot:footer><p>{{text}}</p></template>
    </timekeep-input>`,
  setup() {
    const text = ref("Placeholder");
    return { text };
  },
});

export const Primary = Template.bind({});
