<template>
  <div class="timekeep-calendar">
    <p>{{ monthsOfTheYear[month] }}</p>
    <div class="grid">
      <p :class="cell.class" v-for="cell in cells" :key="cell.content">{{ cell.content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

import UniversalDate from "@/utils/universal-date";

class Props {
  year!: number;
  month!: number;
}

export default class TimekeepNotebook extends Vue.with(Props) {
  daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  cells: { class: string; content: string }[] = [];

  mounted(): void {
    const startOfTheMonth = UniversalDate.fromUTC({ year: this.year, month: this.month });
    const endOfTheMonth = UniversalDate.fromUTC({ year: this.year, month: this.month, date: this.daysOfMonth(this.year, this.month + 1) });
    const firstWeekOffset = startOfTheMonth.dayOfWeek;
    const startWeek = startOfTheMonth.week;
    const days = endOfTheMonth.day;

    this.cells.push({ class: "", content: "" });
    for (let i = 0; i < 7; i++) this.cells.push({ class: "week-day", content: this.daysOfTheWeek[i][0] });

    let day = 0;
    for (let i = 0; i < 6; i++) {
      const week = startWeek + i;
      const offset = i == 0 ? firstWeekOffset + 1 : 0;
      this.cells.push({ class: "week-number", content: week.toString() });
      for (let j = 0; j < 7; j++) {
        if (j < offset) {
          this.cells.push({ class: "day", content: "" });
        } else if (day < days) {
          this.cells.push({ class: "day", content: (++day).toString() });
        } else {
          this.cells.push({ class: "day", content: "" });
        }
      }
    }
  }

  // 1-based month
  daysOfMonth(year: number, month: number): number {
    const date = UniversalDate.fromUTC({ year, month: month + 1 });
    // The dates are basically 1-indexed, meaing 0 will be -1 - the last day
    // of the previous month. We therefore offset the input month by one
    // to get the requested month's end day
    date.date.setDate(0);
    return date.day;
  }
}
</script>

<style scoped>
.timekeep-calendar {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  padding: 15px;
  padding-right: 47px;
}

.timekeep-calendar > p {
  font-size: 22px;
  margin-bottom: 10px;
  text-align: center;
}

.timekeep-calendar .grid {
  display: grid;
  grid-template-columns: repeat(8, 32px);
  grid-template-rows: auto repeat(6, 32px);
  row-gap: 5px;
  column-gap: 5px;
}

.day,
.week-number,
.week-day {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.day {
  background-color: #eeeeee;
}

.week-number,
.week-day {
  font-weight: bold;
}
</style>
