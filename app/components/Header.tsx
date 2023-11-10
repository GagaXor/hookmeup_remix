import { Navbar, Dropdown, Avatar } from "flowbite-react"
import { Link } from "@remix-run/react"

export  function Header(props: any) {
    const user = props.user
    return (
      <div className="mb-3 grid grid-cols-1 ">
        <Navbar
            fluid
            rounded
            >
            <Navbar.Brand href="https://flowbite-react.com">
                <img
                alt="Flowbite React Logo"
                className="mr-3 h-6 sm:h-20 text-white"
                src="/making-love2.png"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Hook Me Up
                </span>
            </Navbar.Brand>
            {user?.profile && <div className="flex md:order-2 z-50">
                <Dropdown
                inline
                label={<Avatar alt="User settings" img={user?.profile?.profilePictureUrl} rounded/>}
                >
                <Dropdown.Header>
                    <span className="block text-sm">
                    {user.profile.fullName}
                    </span>
                    <span className="block truncate text-sm font-medium">
                    {user.email}
                    </span>
                </Dropdown.Header>
                <Link to="/myProfile"  >
                    <Dropdown.Item >
                        View My Profile
                    </Dropdown.Item> 
                </Link>
                <Dropdown.Item>
                    My Booking
                </Dropdown.Item>
                <Dropdown.Item>
                    My Wallet
                </Dropdown.Item>
                <Dropdown.Item>
                    My Reviews
                </Dropdown.Item>
                <Dropdown.Item>
                    Refferal
                </Dropdown.Item>
                <Dropdown.Item>
                    My Favourite
                </Dropdown.Item>
                <Dropdown.Item>
                    Classified Ads
                </Dropdown.Item>
                <Dropdown.Item>
                    My Events
                </Dropdown.Item>
                <Dropdown.Item>
                    My Discussions
                </Dropdown.Item>
                <Dropdown.Item>
                    Change Password
                </Dropdown.Item>
                <Dropdown.Item>
                    Delete Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Link to="/logout"  >
                    <Dropdown.Item >
                        Logout
                    </Dropdown.Item> 
                </Link>
                </Dropdown>
            </div>}
            </Navbar>
        </div>
    )
}