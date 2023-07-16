import { Box } from "@mui/material";

const stripeColor = "rgba(255,255,255,0.15)";

export const strippedBackground = `repeating-linear-gradient( 45deg, ${stripeColor}, ${stripeColor} 30px,transparent 30px,transparent 60px)`;

interface Props {
  stripesWidth: number;
}

export default function ProgressBackground(props: Props) {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          backgroundImage: strippedBackground,
          left: "0%",
          width: `${props.stripesWidth}%`,
          height: "100%",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          backgroundImage:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.5), transparent)",
          borderRadius: "50px",
          left: "0%",
          width: "50%",
          height: "100%",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.3))",
          borderRadius: "50px",
          left: "50%",
          width: "50%",
          height: "100%",
        }}
      ></Box>
    </>
  );
}
