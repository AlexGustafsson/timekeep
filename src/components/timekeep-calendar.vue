<template>
  <div class="timekeep-calendar">
    <p>{{ monthName }}</p>
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

class TimekeepNotebook extends Vue.with(Props) {
  cells: { class: string; content: string }[] = [];

  get monthName(): string {
    return UniversalDate.monthNames[this.month - 1];
  }

  mounted(): void {
    const startOfTheMonth = UniversalDate.fromUTC({ year: this.year, month: this.month });
    const startOfTheFirstWeek = UniversalDate.fromWeek(this.year, startOfTheMonth.week);
    const endOfTheMonth = UniversalDate.fromUTC({ year: this.year, month: this.month, dayOfTheMonth: UniversalDate.daysOfMonth(this.year, this.month) });
    const endOfTheLastWeek = UniversalDate.fromWeek(this.year, endOfTheMonth.week, 6);
    const weekBoundary = endOfTheLastWeek.offsetWeeks(1).week;

    // const endOfTheMonth = UniversalDate.fromUTC({ year: this.year, month: this.month, dayOfTheMonth: UniversalDate.daysOfMonth(this.year, this.month + 1) });
    // const firstWeekOffset = startOfTheMonth.dayOfTheWeek;
    // const startWeek = UniversalDate.fromWeek(this.year, startOfTheMonth.week);
    // const days = endOfTheMonth.dayOfTheMonth;

    const weeks: number[] = [];
    for (let i = 0; i < 6; i++) weeks.push(startOfTheFirstWeek.offsetWeeks(i).week);

    // Add a padding cell
    this.cells.push({ class: "", content: "" });
    // Add the names of the week days
    for (let i = 0; i < 7; i++) this.cells.push({ class: "week-day", content: UniversalDate.dayNames[i][0] });

    let currentDay = UniversalDate.fromDate(startOfTheFirstWeek.date);
    while (currentDay.week != weekBoundary) {
      if (this.cells.length % 8 === 0) this.cells.push({ class: "week-number", content: currentDay.week.toString() });
      this.cells.push({ class: currentDay.month === this.month ? "day" : "other-day", content: currentDay.dayOfTheMonth.toString() });
      currentDay = currentDay.offsetDays(1);
    }
  }
}
export {TimekeepNotebook as default};
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
.other-day,
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

.other-day {
  background-color: #fafafa;
  color: #eeeeee;
}

.week-number,
.week-day {
  font-weight: bold;
}
</style>
