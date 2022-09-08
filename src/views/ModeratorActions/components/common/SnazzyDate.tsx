import Moment from "react-moment";
import "moment-timezone";

const DATETIME_FORMAT = "DD.MM.YYYY, hh:mm:ss";
const TIMEZONE = "Europe/Moscow";

export default function SnazzyDate(props: {
  date: string;
}) {
  return (
    <Moment 
      withTitle 
      titleFormat={DATETIME_FORMAT}
      element="span" 
      date={props.date} 
      tz={TIMEZONE} 
      locale="ru"
      fromNow
      interval={5}
    />
  );
}