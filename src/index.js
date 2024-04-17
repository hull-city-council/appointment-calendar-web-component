import r2wc from "@r2wc/react-to-web-component";
import Calendar from "./Component/calendar";

const calendar = r2wc(Calendar, { props: ["date"] });

customElements.define("calendar-web-component", calendar);
