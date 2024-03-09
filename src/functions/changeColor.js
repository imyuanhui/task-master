export const changeColor = (id, color, level) => {
    const element = document.getElementById(id);
    if (level === "todo") {
        element?.classList.add(`${color}-text`);
    } else {
       element?.classList.add(`${color}-background`); 
    }
}