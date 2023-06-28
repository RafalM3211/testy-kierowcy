import { Button } from "@mui/material"
import type {ButtonProps} from "@mui/material/Button"

interface Props extends ButtonProps{
    to: string
}

export default function NavLink(props: Props){
    return (
        <Button size="large" sx={{...props?.sx, textTransform: "capitalize", fontSize: "1.1em"}}>{props.children}</Button>
    )
}