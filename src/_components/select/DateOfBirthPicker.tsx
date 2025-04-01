import React, { useState, useEffect } from 'react';
import styles from './DateOfBirthPicker.module.scss'; // 스타일 import
import CustomSelect from './CustomSelect';

const DateOfBirthPicker = ({ label, value, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1920 + 1 },
    (_, i) => currentYear - i,
  );
  // 1~12월에 대해 10 이하일 경우 앞에 '0'을 붙여서 배열 생성
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, '0'),
  );
  // 1~31일까지의 일에 대해 10 이하일 경우 앞에 '0'을 붙여서 배열 생성
  const [days, setDays] = useState(
    Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')),
  );

  const [selectedYear, setSelectedYear] = useState(value ? value.year : '');
  const [selectedMonth, setSelectedMonth] = useState(value ? value.month : '');
  const [selectedDay, setSelectedDay] = useState(value ? value.day : '');

  const [nowSelect, setNowSelect] = useState(null);
  // Month나 Year가 변경되었을 때 일수를 업데이트하는 useEffect
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const maxDays = new Date(selectedYear, selectedMonth, 0).getDate(); // 해당 월의 마지막 날짜
      setDays(
        Array.from({ length: maxDays }, (_, i) =>
          String(i + 1).padStart(2, '0'),
        ),
      ); // 일수 배열을 업데이트
      if (selectedDay > maxDays) {
        setSelectedDay(maxDays); // 현재 선택된 날이 최대 일수를 넘으면 그에 맞게 조정
      }
    }
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (year: any) => {
    console.log('here');
    setSelectedYear(year);
    onChange({ year, month: selectedMonth, day: selectedDay });
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    onChange({ year: selectedYear, month, day: selectedDay });
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
    onChange({ year: selectedYear, month: selectedMonth, day });
  };

  console.log('selectedYear', selectedYear);
  console.log('selectedMonth', selectedMonth);
  console.log('selectedDay', selectedDay);

  return (
    <div>
      {label && (
        <label style={{ marginBottom: '4px', fontWeight: '500' }}>
          {label}
        </label>
      )}
      <div className={styles.selectContainer}>
        <div className={styles.selectBox} style={{ width: '200px' }}>
          <span>Year</span>
          <CustomSelect
            options={years}
            onSelect={(value: any) => handleYearChange(value)}
            id={'yearSelect'}
            value={selectedYear}

            //   isDisabled={true}
            //   error="error"
            // onChange={(e: any) => {
            //   setValue(e.target.value);
            // }}
          />
          {/* <ul className={styles.dropdown}>
            {years.map((year) => (
              <li
                key={year}
                className={styles.option}
                onClick={() => handleYearChange(year)}
              >
                {year}
              </li>
            ))}
          </ul> */}
        </div>
        <div className={styles.selectBox} style={{ width: '200px' }}>
          <span>Month</span>
          <CustomSelect
            options={months}
            onSelect={(value: any) => handleMonthChange(value)}
            id="monthSelect" // 고유 id 부여
            value={selectedMonth}
            // value={value}
            //   isDisabled={true}
            //   error="error"
            // onChange={(e: any) => {
            //   setValue(e.target.value);
            // }}
          />
          {/* <ul className={styles.dropdown}>
            {months.map((month) => (
              <li
                key={month}
                className={styles.option}
                onClick={() => handleMonthChange(month)}
              >
                {month}
              </li>
            ))}
          </ul> */}
        </div>
        <div className={styles.selectBox} style={{ width: '200px' }}>
          <span>Day</span>
          <CustomSelect
            options={days}
            onSelect={(value: any) => handleDayChange(value)}
            id="daySelect" // 고유 id 부여
            value={selectedDay}
            // value={value}
            //   isDisabled={true}
            //   error="error"
            // onChange={(e: any) => {
            //   setValue(e.target.value);
            // }}
          />
        </div>
      </div>
      <div>
        <p>
          Selected Date: {selectedYear} - {selectedMonth} - {selectedDay}
        </p>
      </div>
    </div>
  );
};

export default DateOfBirthPicker;
