import { IoMdTrash } from "react-icons/io";
import "./ListRmvBtn.css";

const ListRmvBtn = ({ onClick }) => {
    return (
        <div className="ListRmvBtn">
            <IoMdTrash onClick={onClick} />
        </div>
    );
}

export default ListRmvBtn;
