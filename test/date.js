import test from 'ava';

import UniversalDate from '../src/utils/universal-date';

function createWeek(monday) {
  const days = [];
  for (let i = 0; i < 7; i++)
    days.push(new UniversalDate(monday.getTime() + (24 * 60 * 60 * 1000 * i)));

  return days.map(x => x.week);
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
  const universalDate = UniversalDate.fromUTC({year: 2020, month: 0, date: 14});

  t.is(1, universalDate.dayOfWeek);
});

test('can get year', t => {
  const universalDate = UniversalDate.fromUTC({year: 2020, month: 0, date: 14});

  t.is(2020, universalDate.year);
});

test('can compare years', t => {
  const universalDate = UniversalDate.fromUTC({year: 2020, month: 6, date: 24});
  const positive = UniversalDate.fromUTC({year: 2020, month: 6, date: 24});
  const negative = UniversalDate.fromUTC({year: 2019, month: 6, date: 24});

  t.true(universalDate.isSameYear(positive));
  t.false(universalDate.isSameYear(negative));
});

test('can compare weeks', t => {
  // Week 30
  const universalDate = UniversalDate.fromUTC({year: 2020, month: 6, date: 24});
  // Week 30
  const positive = UniversalDate.fromUTC({year: 2020, month: 6, date: 24});
  // Week 3
  const negative = UniversalDate.fromUTC({year: 2020, month: 6, date: 17});

  t.true(universalDate.isSameWeek(positive));
  t.false(universalDate.isSameWeek(negative));
});

test('can compare days', t => {
  const universalDate = UniversalDate.fromUTC({year: 2020, month: 6, date: 24});
  const positive = UniversalDate.fromUTC({year: 2020, month: 6, date: 24});
  const negative = UniversalDate.fromUTC({year: 2019, month: 2, date: 23});

  t.true(universalDate.isSameDay(positive));
  t.false(universalDate.isSameDay(negative));
});

test('can get start of day', t => {
  const universalDate = UniversalDate.fromUTC({year: 2020, month: 6, date: 24, hours: 12, minutes: 12});

  t.is(1595548800000, universalDate.getStartOfDay());
});
