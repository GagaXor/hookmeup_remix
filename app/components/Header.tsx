import { Navbar, Dropdown, Avatar } from "flowbite-react"

export  function Header(data: any) {
    const user = data.user
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
            <div className="flex md:order-2 z-50">
                <Dropdown
                inline
                label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
                >
                <Dropdown.Header>
                    <span className="block text-sm">
                    Bonnie Green
                    </span>
                    <span className="block truncate text-sm font-medium">
                    {user.email}
                    </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                    Settings
                </Dropdown.Item>
                <Dropdown.Item>
                    Earnings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    Logout
                </Dropdown.Item> 
                
                </Dropdown>
            </div>
            </Navbar>
        </div>
    )
}