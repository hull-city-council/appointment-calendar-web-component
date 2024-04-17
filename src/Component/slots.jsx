import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function slots(data) {
  console.log(data.data);
  const slotData = data.data;
  return (
    <Stack spacing={2} direction="column">
      {Array.isArray(slotData) &&
        slotData?.map((slot, index) => (
          <Button variant="outlined">{slot.StartDateTime}</Button>
        ))}
    </Stack>
  );
}
