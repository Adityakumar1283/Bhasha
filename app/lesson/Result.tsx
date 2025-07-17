type Props = {
  variant: "points" | "hearts";
    value: number;
}

const Result = ( { variant,value}:Props) => {
  return (
    <div>
      {variant}
    </div>
  )
}

export default Result
