import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

type ItemProps = {
    nameItem: string;
    childrens?: { label: string; path: string }[];
};

const items: ItemProps[] = [
    {
        nameItem: "Productos",
        childrens: [
            { label: "Registrar Producto", path: "/admin/products" },
        ],
    }
];

const NavigationItem = ({ item }: { item: ItemProps }) => {

    const [open, setOpen] = useState(false);
    const subItemsRef = useRef<HTMLDivElement>(null);
    const hasChildren = !!item.childrens?.length;

    return (
        <div>
            <button
                onClick={() => hasChildren && setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-4 py-2.5
                bg-[#853953] hover:bg-[#612D53] transition-colors duration-200
                text-sm font-semibold text-white cursor-pointer"
            >
                {item.nameItem}
                {hasChildren && (

                    <span
                        className="text-white/60 text-xs transition-transform duration-300"
                        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                        ▼
                    </span>
                )}
            </button>

            {hasChildren && (
                <div
                    ref={subItemsRef}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                        maxHeight: open ? (subItemsRef.current?.scrollHeight ?? 500) : 0,
                    }}
                >
                    <div className="flex flex-col">
                        {item.childrens!.map((child) => (
                            <NavLink
                                key={child.label}
                                to={child.path}
                                className={({ isActive }) =>
                                    `block px-6 py-2 text-sm transition-colors duration-200 cursor-pointer
                                ${isActive
                                        ? "bg-[#4e2342] text-white font-semibold"
                                        : "bg-[#612D53] hover:bg-[#4e2342] text-white/80 hover:text-white"
                                    }`
                                }
                            >
                                {child.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export const NavigationBar = () => (
    <aside className="bg-[#853953] flex flex-col">
        <div className="w-full bg-white flex justify-center p-3 border-b border-[#853953]/20">
            <h2 className="font-semibold text-[#853953] text-sm">Panel de Admin</h2>
        </div>
        <nav className="w-full">
            {items.map((item) => (
                <NavigationItem key={item.nameItem} item={item} />
            ))}
        </nav>
    </aside>
);

export default NavigationBar;