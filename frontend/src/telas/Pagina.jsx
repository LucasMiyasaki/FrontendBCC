import Menu from "./Menu"

export default function Pagina(props) {
    return (
        <div>
            <Menu />
            <div>
                {props.children} 
            </div>
        </div>
    )
}
