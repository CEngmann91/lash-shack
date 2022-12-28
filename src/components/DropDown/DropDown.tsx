import './DropDown.scss'
import React, { useCallback, useState } from 'react'

export interface DropDownMenuItem {
    id: number;
    title: string;
    selected?: boolean;
    key?: string;
    action: () => void;
}
type DropDownProps = {
    menuComponent: React.ReactNode;
    menuClassName?: string;
    menuItems: DropDownMenuItem[];
    menuItemsClassName?: string;
}
function DropDown({ menuClassName, menuComponent, menuItems, menuItemsClassName }: DropDownProps) {
    const [visible, setVisible] = useState(false);
    const handleClick = useCallback(() => {
        setVisible(prev => prev = !prev);
    }, []);


    return (
        <div className={`dropdown ${menuClassName}`}>
            <div className='menu-button-container' onClick={handleClick}>
                {menuComponent}
            </div>
            <div className='container' style={{ display: (visible ? 'flex' : 'none') }}>
                {menuItems.map(({ id, title, selected, action }) => (
                    <li key={id} className={menuItemsClassName}>
                        <button onClick={() => {
                            action();
                            handleClick();
                        }}>
                            <h1>{title}</h1>
                            {/* {selected ? <p>{'<'}</p> : null} */}
                        </button>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default DropDown