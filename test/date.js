import test from 'ava';

import {getWeek, getYear, getDay} from '../src/utils/date';

function createWeek(monday) {
  const days = [];
  for (let i = 0; i < 7; i++)
    days.push(new Date(monday.getTime() + (24 * 60 * 60 * 1000 * i)));

  return days.map(getWeek);
}

test('can get week', t => {
  // 2020-01-13
  const monday = new Date(1578907526850);
  const weeks = createWeek(monday);

  // Ensure that the entire week is the third week
  for (const week of weeks)
    t.is(3, week);
});

test('can get other week', t => {
  // 2021-07-19
  const monday = new Date(1626652800000);
  const weeks = createWeek(monday);

  // Ensure that the entire week is the third week
  for (const week of weeks)
    t.is(29, week);
});

test('can get last week of year', t => {
  // 2019-12-22
  const monday = new Date(1577059200000);
  const weeks = createWeek(monday);

  // Ensure that the entire week is the third week
  for (const week of weeks)
    t.is(52, week);
});

test('can get first week of year', t => {
  // 2019-12-30
  const monday = new Date(1577664000000);
  const weeks = createWeek(monday);

  // Ensure that the entire week is the third week
  for (const week of weeks)
    t.is(1, week);
});

test('can get day of week', t => {
  // 2020-01-14
  const date = new Date(1578990743000);
  const day = getDay(date);

  t.is(2, day);
});

test('can get year', t => {
  // 2020-01-14
  const date = new Date(1578990743000);
  const year = getYear(date);

  t.is(2020, year);
});
