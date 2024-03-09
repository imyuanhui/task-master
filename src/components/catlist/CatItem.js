import { useEffect } from "react";
import { changeColor } from "../../functions/changeColor";
import { removeOldColor } from "../../functions/removeOldColor";
import { FaFolderClosed } from "react-icons/fa6";

const CatItem = ({ id, title, taskCount, selectedCat, setSelectedCat, setSelectedTask}) => {

    const handleClickCatItem = () => {
        removeOldColor(`cat-${selectedCat}`,"grey");
        setSelectedCat(id);
        setSelectedTask(0);
    }

    useEffect(() => {changeColor(`cat-${selectedCat}`, "grey")}, [selectedCat]);

    return (
        <div className="cat-item" style={{width: "100%"}}>
            {/* Set the selected category to the category clicked latest. */}
            <p onClick={() => handleClickCatItem()}>
                <FaFolderClosed />
                <span style={{marginLeft: ".5rem"}}>{title}</span>
                {/* Show the total amount of tasks in the category. */}
                <span>{`(${taskCount})`}</span> 
            </p>
        </div>
    );
}

export default CatItem;