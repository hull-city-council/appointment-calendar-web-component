import { React, useState, useCallback, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function calendar() {
  let [slots, setSlots] = useState();

  const onMessageReceivedFromIframe = useCallback(
    (event) => {
      console.log("Callback event value is...", event.data);
      setSlots(event.data);
    },
    [slots],
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceivedFromIframe);
    return () =>
      window.removeEventListener("message", onMessageReceivedFromIframe);
  }, [onMessageReceivedFromIframe]);

  useEffect(() => {
    console.log("useEffect slots is...", slots);
  }, [slots]);

  const [value, setValue] = useState(dayjs());
  const maxDate = dayjs().add(30, "day");

  function postMessage(message) {
    setValue(message);
    parent.postMessage(message.format("DD/MM/YYYY"), "*");
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          views={["day"]}
          value={value}
          onChange={(newValue) => postMessage(newValue)}
          disablePast={true}
          maxDate={maxDate}
        />
      </LocalizationProvider>
      <Stack spacing={2} direction="column">
        {Array.isArray(slots) &&
          slots?.map((slot, index) => (
            <Button variant="outlined">{slot.StartDateTime}</Button>
          ))}
      </Stack>
    </>
  );
}
