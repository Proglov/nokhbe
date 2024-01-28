import MenuNav from "@/components/home/MenuNav";
import Clubs from "@/components/home/Clubs";

export default function page() {

    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <Clubs />
        </div>
    )
}
