import { IoMdAdd } from "react-icons/io";

const FooterBtn = ( {text, left, onClick} ) => {
    return (
        <button
            onClick={onClick}
            style={{
                position: "sticky",
                width: "298px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "1rem",
                margin: "0",
                padding: "0",
                zIndex: "1"
        }}>
            <IoMdAdd style={{marginRight: "1rem"}}/><p>{text}</p>
        </button>
    );
}

export default FooterBtn;