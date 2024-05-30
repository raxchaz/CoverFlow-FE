import DatePicker from 'react-datepicker';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';


interface CalendarProps {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

function Calendar({ startDate, setStartDate, endDate, setEndDate }: CalendarProps) {

  return (
    <Box>
      <DateContainer
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy-MM-dd"
      />
      <Slash>~</Slash>
      <DateContainer
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy-MM-dd"
      />
    </Box>
  );
}

export default Calendar;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const DateContainer = styled(DatePicker)`
  width: 135px;
  height: 28px;
  
`;

const Slash = styled.p`
  padding-right: 5px;
  padding-left: 5px;
  font-size: 20px;
`;
