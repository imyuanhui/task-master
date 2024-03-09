export const removeOldColor = (id, color, level) => {
    const element = document.getElementById(id);

    if (level === "todo") {
        element?.classList.remove(`${color}-text`);
    } else {
       element?.classList.remove(`${color}-background`); 
    }
    
}