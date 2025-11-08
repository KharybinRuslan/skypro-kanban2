import "./Calendar.css";
import { useState, useEffect } from "react";

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function Calendar({ onDateChange, selectedDate }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      return date.getDate();
    }
    return today.getDate();
  });

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
      setSelectedDay(date.getDate());
    }
  }, [selectedDate]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (onDateChange) {
      onDateChange(selected.toISOString());
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Days from previous month
  const prevMonthDays = getDaysInMonth(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  );
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isOtherMonth: true,
    });
  }

  // Days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      i === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
    const isSelected = i === selectedDay;
    const dayOfWeek = (firstDay + i - 1) % 7;
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

    days.push({
      day: i,
      isOtherMonth: false,
      isToday,
      isSelected,
      isWeekend,
    });
  }

  // Days from next month to fill the grid
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isOtherMonth: true,
    });
  }

  const formatSelectedDate = () => {
    if (!selectedDay) return "";
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDay
    );
    const day = String(selected.getDate()).padStart(2, "0");
    const month = String(selected.getMonth() + 1).padStart(2, "0");
    const year = String(selected.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="calendar">
      <p className="calendar__ttl subttl">Даты</p>
      <div className="calendar__block">
        <div className="calendar__nav">
          <div className="calendar__month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <div className="nav__actions">
            <div className="nav__action" onClick={handlePrevMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </div>
            <div className="nav__action" onClick={handleNextMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="calendar__content">
          <div className="calendar__days-names">
            <div className="calendar__day-name">пн</div>
            <div className="calendar__day-name">вт</div>
            <div className="calendar__day-name">ср</div>
            <div className="calendar__day-name">чт</div>
            <div className="calendar__day-name">пт</div>
            <div className="calendar__day-name -weekend-">сб</div>
            <div className="calendar__day-name -weekend-">вс</div>
          </div>
          <div className="calendar__cells">
            {days.map((dayData, index) => (
              <div
                key={index}
                className={`calendar__cell ${
                  dayData.isOtherMonth
                    ? "_other-month"
                    : dayData.isWeekend
                    ? "_cell-day _weekend"
                    : "_cell-day"
                } ${dayData.isToday ? "_current" : ""} ${
                  dayData.isSelected ? "_active-day" : ""
                }`}
                onClick={() =>
                  !dayData.isOtherMonth && handleDayClick(dayData.day)
                }
                style={{ cursor: dayData.isOtherMonth ? "default" : "pointer" }}
              >
                {dayData.day}
              </div>
            ))}
          </div>
        </div>

        <input type="hidden" id="datepick_value" value={formatSelectedDate()} />
        <div className="calendar__period">
          <p className="calendar__p date-end">
            Срок исполнения:{" "}
            <span className="date-control">{formatSelectedDate()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
