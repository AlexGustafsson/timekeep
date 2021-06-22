import UniversalDate, { UTCValues } from "./universal-date";

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised);
const { expect } = chai;

describe("universal-date", () => {
  it("initializes with timestamp", () => {
    const aprilEleventhTwentyTwentyOne = 1618099200000;
    const date = new UniversalDate(aprilEleventhTwentyTwentyOne);
    expect(date.year).to.equal(2021);
    expect(date.month).to.equal(4);
    expect(date.dayOfTheMonth).to.equal(11);
  });

  it("initializes with a date", () => {
    const aprilEleventhTwentyTwentyOne = new Date(Date.UTC(2021, 3, 11));
    const date = UniversalDate.fromDate(aprilEleventhTwentyTwentyOne);
    expect(date.year).to.equal(2021);
    expect(date.month).to.equal(4);
    expect(date.dayOfTheMonth).to.equal(11);
  });

  it("initializes with UTC", () => {
    const date = UniversalDate.fromUTC({year: 2021, month: 4, dayOfTheMonth: 11});
    expect(date.year).to.equal(2021);
    expect(date.month).to.equal(4);
    expect(date.dayOfTheMonth).to.equal(11);
  });

  it("initializes with week", () => {
    const dates: [[number, number, number], UTCValues][] = [
      [[2021, 13, 3], { year: 2021, month: 4, dayOfTheMonth: 1 }],
      [[2021, 53, 0], { year: 2020, month: 12, dayOfTheMonth: 28 }], // January first 2021 was still week 53, a year after a leap year
      [[2021, 1, 0], { year: 2021, month: 1, dayOfTheMonth: 4 }],
      [[2020, 9, 5], { year: 2020, month: 2, dayOfTheMonth: 29 }], // 2020 was a leap year, test February 29th
    ];

    for (const [[year, week, dayOfTheWeek], utcValues] of dates)
      expect(UniversalDate.fromWeek(year, week, dayOfTheWeek).date.toString()).to.equal(UniversalDate.fromUTC(utcValues).date.toString());
  });

  it("returns valid week numbers", () => {
    const weeks: [number, UTCValues][] = [
      [13, { year: 2021, month: 4, dayOfTheMonth: 1 }],
      [53, { year: 2021, month: 1, dayOfTheMonth: 1 }], // January first 2021 was still week 53, a year after a leap year
      [1, { year: 2021, month: 1, dayOfTheMonth: 4 }],
      [9, { year: 2020, month: 2, dayOfTheMonth: 29 }], // 2020 was a leap year, test February 29th
    ];

    for (const [week, utcValues] of weeks)
      expect(UniversalDate.fromUTC(utcValues).week).to.equal(week);
  });

  it("returns valid days of the week", () => {
    const days: [number, UTCValues][] = [
      [0, { year: 2021, month: 4, dayOfTheMonth: 12 }],
      [1, { year: 2020, month: 12, dayOfTheMonth: 1 }],
      [2, { year: 2020, month: 10, dayOfTheMonth: 28 }],
      [3, { year: 2019, month: 9, dayOfTheMonth: 5 }],
      [4, { year: 2021, month: 1, dayOfTheMonth: 1 }],
      [5, { year: 2020, month: 2, dayOfTheMonth: 29 }],
      [6, { year: 2018, month: 7, dayOfTheMonth: 22 }],
    ];

    for (const [dayOfTheWeek, utcValues] of days)
      expect(UniversalDate.fromUTC(utcValues).dayOfTheWeek).to.equal(dayOfTheWeek);
  });

  it("calculates the days of a month", () => {
    const months: [number, number, number][] = [
      [2021, 4, 30],
      [2020, 2, 29],
      [2021, 2, 28],
    ];

    for (const [year, month, days] of months)
      expect(UniversalDate.daysOfMonth(year, month)).to.equal(days);
  });

  it("offsets weeks", () => {
    const date = UniversalDate.fromUTC({year: 2021, month: 4, dayOfTheMonth: 11});

    const oneWeekOffset = date.offsetWeeks(1);
    expect(oneWeekOffset.week).to.equal(15);

    const oneYearOffset = date.offsetWeeks(52);
    expect(oneYearOffset.week).to.equal(14);

    const negativeOffset = date.offsetWeeks(-14);
    expect(negativeOffset.week).to.equal(53);
  });

  it("offsets days", () => {
    const date = UniversalDate.fromUTC({year: 2021, month: 4, dayOfTheMonth: 11});

    const oneDayOffset = date.offsetDays(1);
    expect(oneDayOffset.dayOfTheMonth).to.equal(12);

    const oneYearOffset = date.offsetDays(365);
    expect(oneYearOffset.year).to.equal(2022);

    const negativeOffset = date.offsetDays(-1);
    expect(negativeOffset.dayOfTheMonth).to.equal(10);
  });
});
