import MyResturants from "../components/dashboard/MyResturnats"
import Header from "../components/essentials/Header"
const DashboardPage = () => {
  return (
    <div className="px-[40px] pt-4">
        <Header/>
        <MyResturants/>
    </div>
  )
}

export default DashboardPage