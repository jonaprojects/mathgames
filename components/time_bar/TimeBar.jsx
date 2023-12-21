import ProgressBar from "../progress_bar/ProgressBar";

export default function TimeBar(props) {
  return (
    <ProgressBar
      className={props.className}
      hideText={true}
      height="h-1"
      progress={props.progress}
      duration={props.duration}
      ease="linear"
    />
  );
}
