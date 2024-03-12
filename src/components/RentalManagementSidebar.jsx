import { useContext } from 'react';

import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

/* *******************************************************/
/* display logging
/* *******************************************************/
const showLogging = false;

export default function RentalManagementSidebar({
        projects, 
        selectedProjectId,
        handleClick}) {

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-x1">
            <h2 className="mb-8 font-bold uppercase md:text-x1 text-stone-200">
                Projects
            </h2>
            <ul className="mt-8">
                {projects.map((project) => {
                    let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

                    if (project.id === selectedProjectId) {
                        cssClasses += " text-stone-200 bg-stone-800 text-8xl";
                    } else {
                        cssClasses += " text-stone-400 text-xs";
                    }

                    return (
                        <li key={project.id}>
                            <Button className={cssClasses} onClick={() => handleClick(project.id)}>
                                {project.title}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}