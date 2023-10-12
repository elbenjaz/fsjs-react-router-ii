import { NavLink } from "react-router-dom";

const Menu = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

    return (
        <nav className="Menu p-4 d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center">
            <img src="../logo.png" className="me-4 mb-2" />

            <div>
                <NavLink className={setActiveClass} to="/">Home</NavLink>

                <NavLink className={setActiveClass} to="/pokemon">Pokémon</NavLink>
            </div>
        </nav>
    );
};

export default Menu;
