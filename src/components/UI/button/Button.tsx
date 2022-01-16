import { Btn } from "./ButtonStyles"

interface IProps {
    bg: string,
    color: string,
    onClick: () => void,
    disabled: boolean
}

const Button: React.FC<IProps> = (props) => {
    return (
        <Btn bg={props.bg} color={props.color} onClick={props.onClick} disabled={ props.disabled }>
            { props.children }
        </Btn>
    )
}

export default Button