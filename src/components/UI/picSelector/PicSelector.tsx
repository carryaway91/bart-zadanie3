import { Container } from './PicSelectorStyles'

interface IProps {
    top: string,
    right?: number,
    left?: number,
    bg: string,
    onClick: () => void,
}
const PicSelector: React.FC<IProps> = (props) => {
    const { top, left, right, bg, onClick } = props

    return (
    <Container top={top} left={left} right={right} bg={bg} onClick={onClick}>
        { props.children }
    </Container>
    )
}

export default PicSelector