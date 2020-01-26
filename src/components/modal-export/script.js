/* globals document */

import {exportToExcel} from '../../utils';

import {default as FormInput} from '../form-input/model.vue';

export default {
  name: 'modal-export',
  data() {
    return {
      format: 'hh:mm:ss',
      formatOptions: [
        {label: 'Hours, minutes and seconds (hh:mm:ss)', value: 'hh:mm:ss'},
        {label: 'Decimal hours (1.5h)', value: 'hh'}
      ]
    };
  },
  methods: {
    async exportToExcel() {
      const blob = await exportToExcel(this.$store.timekeeps, {format: this.format});

      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = 'timekeep.xlsx';
      element.click();
    }
  },
  components: {
    FormInput
  }
};
