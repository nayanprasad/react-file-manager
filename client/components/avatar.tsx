import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Separator} from "@/components/ui/separator"
import LogoutIcon from '@mui/icons-material/Logout';
import {useProfile} from "@/hooks/use-profile-store";
import {useRouter} from "next/navigation";


const UserAvatar = () => {

    const {user, onLogout} = useProfile()
    const router = useRouter()

    const handleLogout = () => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/logout`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    onLogout();
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    router.push("/login")
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="bg-gray-950 p-2 rounded-full">
                    <AccountCircleIcon className="text-white"/>
                </div>
            </PopoverTrigger>
            <PopoverContent className="bg-gray-50 shadow">
                <div className="flex flex-col p-2">
                    <h1 className="text-md font-semibold ml-2">
                        {user?.name}
                    </h1>
                    <span className="text-xs font-semibold ml-2">
                        {user?.email}
                    </span>
                </div>
                <Separator/>
                <div className="flex flex-col p-2">
                    <button onClick={handleLogout}
                            className="hover:bg-red-300 transition ease-in-out hover:cursor-pointer rounded-3xl p-3">
                        < LogoutIcon/>
                        {"Logout"}
                    </button>
                </div>

            </PopoverContent>
        </Popover>
    )
}

export default UserAvatar;
